<?php
namespace Controllers;
use Models\Lockup;
use Models\LockupFile;
use Models\User;
use \SvgGenerator as SVG;

class LockupsController extends Controller {

	public static function createAction() {
		\Core::$breadcrumbs[] = array('text' => 'Create Lockup');

		$context = new \stdClass;
		$context->approvers = User::find('all', array('conditions' => array('role' => 'approver')));
		return self::renderView('new_lockup', $context);
	}

	public static function postCreateAction($post_params) {
		self::requireAuth();

		# take the params and generate a base lockup from that template
		$lockup = new \stdClass;

		$lockup->org_name = 				strtoupper($post_params['organization']);
		$lockup->org_second_line = 			strtoupper($post_params['organization_second_line']);
		$lockup->subject = 					$post_params['subject'];
		$lockup->subject_second_line = 		$post_params['subject_second_line'];
		$lockup->acronym = 					strtoupper($post_params['acronym']);
		$lockup->acronym_subject = 			strtoupper($post_params['acronym_subject']);
		$lockup->extension_county = 		$post_params['extension_county'];
		$lockup->style = 					$post_params['type'];

		# set preview to true
		$lockup->preview = TRUE;

		$svg_text = SVG::createPreviewLockup($post_params['type'], $lockup)->svg_text;
		$vert_svg_text = SVG::createPreviewLockup($post_params['type'], $lockup, 'vert')->svg_text;
		
		$model = Lockup::create(array(
			'organization' => 				strtoupper($post_params['organization']),
			'organization_second_line' => 	strtoupper($post_params['organization_second_line']),
			'subject' => 					$post_params['subject'],
			'subject_second_line' => 		$post_params['subject_second_line'],
			'acronym' => 					strtoupper($post_params['acronym']),
			'acronym_subject' => 			strtoupper($post_params['acronym_subject']),
			'extension_county' =>	 		$post_params['extension_county'],
			'style' => 						$post_params['type'],
			'user_id' => 					\Auth::$current_user->id,
			'date_created' => 				date('Y-m-d H:i:s'),
			'preview_svg' => 				$svg_text,
			'vert_preview_svg' => 			$vert_svg_text,
			'approver_id' => 				empty($post_params['approver']) ? NULL : $post_params['approver'],
			'file_organization' =>			$post_params['file_organization'],
			'file_organization_acronym' =>  $post_params['file_organization_acronym'],
			'file_department' => 			$post_params['file_department'],
			'file_department_acronym' =>	$post_params['file_department_acronym']
		));

		\Core::redirect($model->getPreviewURL());
	}

	public static function previewAction($get_params) {
		self::requireAuth();
		\Core::$breadcrumbs[] = array('text' => 'Preview Lockup');

		if (empty($get_params['id'])) {
			\Core::notFound();
		}

		$id = $get_params['id'];
		try {
			$lockup = Lockup::find($id);
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		if ($lockup->status == Lockup::GENERATED) {
			\Core::redirect($lockup->getDownloadURL());
		}

		$context = new \stdClass;
		$context->lockup = $lockup;

		return self::renderView('preview_lockup', $context);
	}

	public static function postApproveAction($post_params) {
		self::requireAuth();
		
		if (empty($post_params['id'])) {
			\Core::notFound();
		}

		$id = $post_params['id'];
		try {
			$lockup = Lockup::find($id);
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		if (\Auth::$current_user->isAdmin()) {
			$lockup->status = Lockup::APPROVED;
			$lockup->creative_status = Lockup::APPROVED;
			$lockup->creative_feedback = $post_params['creative_feedback'];
			$lockup->communicator_feedback = $post_params['communicator_feedback'];
		} else if (\Auth::$current_user->isCreative()) {
			$lockup->creative_feedback = $post_params['creative_feedback'];
			if ($lockup->user->id == \Auth::$current_user->id) {
				// creative users can full approve their own lockups
				$lockup->status = Lockup::APPROVED;
				$lockup->creative_status = Lockup::APPROVED;
				// if they do so, remove the approver
				$lockup->approver_id = NULL;
			} else {
				$lockup->creative_status = Lockup::APPROVED;
			}
		} else if (\Auth::$current_user->isApprover() && $lockup->approver_id == \Auth::$current_user->id) {
			$lockup->communicator_feedback = $post_params['communicator_feedback'];
			$lockup->status = Lockup::APPROVED;
		}
		$lockup->save();

		\Core::redirect($lockup->getPreviewURL());
	}

	public static function postFeedbackAction($post_params) {
		self::requireAuth();
		
		if (empty($post_params['id'])) {
			\Core::notFound();
		}

		$id = $post_params['id'];
		try {
			$lockup = Lockup::find($id);
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		if (\Auth::$current_user->isAdmin()) {
			if ($lockup->status == Lockup::AWAITING_APPROVAL) {
				$lockup->status = Lockup::FEEDBACK_GIVEN;
			}
			if ($lockup->creative_status == Lockup::AWAITING_APPROVAL) {
				$lockup->creative_status = Lockup::FEEDBACK_GIVEN;
			}
			$lockup->creative_feedback = $post_params['creative_feedback'];
			$lockup->communicator_feedback = $post_params['communicator_feedback'];
		} else if (\Auth::$current_user->isCreative()) {
			$lockup->creative_feedback = $post_params['creative_feedback'];
			if ($lockup->creative_status == Lockup::AWAITING_APPROVAL) {
				$lockup->creative_status = Lockup::FEEDBACK_GIVEN;
			}
		} else if (\Auth::$current_user->isApprover() && $lockup->approver_id == \Auth::$current_user->id) {
			$lockup->communicator_feedback = $post_params['communicator_feedback'];
			if ($lockup->status == Lockup::AWAITING_APPROVAL) {
				$lockup->status = Lockup::FEEDBACK_GIVEN;
			}
		}
		$lockup->save();

		\Core::redirect($lockup->getPreviewURL());
	}

	public static function postDenyAction($post_params) {
		self::requireAuth();
		
		if (empty($post_params['id'])) {
			\Core::notFound();
		}

		$id = $post_params['id'];
		try {
			$lockup = Lockup::find($id);
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		if (\Auth::$current_user->isAdmin()) {
			$lockup->status = Lockup::DENIED;
			$lockup->creative_status = Lockup::DENIED;
			$lockup->creative_feedback = $post_params['creative_feedback'];
			$lockup->communicator_feedback = $post_params['communicator_feedback'];
		} else if (\Auth::$current_user->isCreative()) {
			$lockup->creative_feedback = $post_params['creative_feedback'];
			$lockup->creative_status = Lockup::DENIED;
		} else if (\Auth::$current_user->isApprover() && $lockup->approver_id == \Auth::$current_user->id) {
			$lockup->communicator_feedback = $post_params['communicator_feedback'];
			$lockup->status = Lockup::DENIED;
		}
		$lockup->save();

		\Core::redirect($lockup->getPreviewURL());
	}

	public static function postGenerateAction($post_params) {
		self::requireAuth();

		if (empty($post_params['id'])) {
			\Core::notFound();
		}

		$id = $post_params['id'];
		try {
			$lockup_model = Lockup::find($id);
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		$frontend_output = $lockup_model->createAllVersions();
		self::storeGenerateOutput(join($frontend_output, '&#013; &#010;'));

		$lockup_model->status = Lockup::GENERATED;
		$lockup_model->save();

		\Core::redirect($lockup_model->getDownloadURL());
	}

	public static function downloadAction($get_params) {
		self::requireAuth();
		\Core::$breadcrumbs[] = array('text' => 'Lockup Details and Files');

		if (empty($get_params['id'])) {
			\Core::notFound();
		}
		$id = $get_params['id'];
		try {
			$lockup = Lockup::find($id, array('include' => array('files', 'user')));
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		$context = new \stdClass;
		$context->lockup = $lockup;

		return self::renderView('download_lockup_files', $context);
	}

	public static function manageAction($get_params) {
		self::requireAuth();
		\Core::$breadcrumbs[] = array('text' => 'Manage Lockups');

		$context = new \stdClass;
		$context->all_lockups = Lockup::all(array('include' => array('user')));
		$context->my_lockups = \Auth::$current_user->lockups;
		$context->approver_lockups = Lockup::all(array('conditions' => array('approver_id = ? AND status in (?)', \Auth::$current_user->id, array('awaiting_approval', 'feedback_given'))));
		$context->creative_approval_lockups = Lockup::all(array('conditions' => array('creative_status in (?)', array('awaiting_approval', 'feedback_given'))));

		return self::renderView('manage_lockups', $context);
	}

	public static function postDeleteAction($post_params) {
		self::requireAuth();

		if (empty($post_params['id'])) {
			\Core::notFound();
		}

		$id = $post_params['id'];
		try {
			$lockup = Lockup::find($id);
		} catch (\ActiveRecord\RecordNotFound $e) {
			\Core::notFound('That lockup could not be found.');
		}

		# the user must have submitted the lockup or be an admin to delete
		if ($lockup->user_id != \Auth::$current_user->id && !(\Auth::$current_user->isAdmin())) {
			self::flashNotice(parent::NOTICE_LEVEL_ERROR, 'Unauthorized', 'Sorry, you are not allowed to delete that lockup.');
			\Core::redirect('/lockups/manage/');
		}

		$lockup->delete();
		self::flashNotice(parent::NOTICE_LEVEL_SUCCESS, 'Lockup deleted', 'That lockup has been deleted.');
		\Core::redirect('/lockups/manage/');
	}

	public static function libraryAction($get_params) {
		self::requireAuth();
		\Core::$breadcrumbs[] = array('text' => 'Lockup Library');

		$context = new \stdClass;
		$lockups = Lockup::all(array('conditions' => array('status' => Lockup::GENERATED), 'include' => array('user', 'approver')));

		$context->lockups = array();
		foreach ($lockups as $lockup) {
			# find the chunk it should be in
			$chunk_id = $lockup->approver_id;
			if ($chunk_id === NULL) {
				$chunk_id = '';
			}

			# create if not exists
			if (!array_key_exists($chunk_id, $context->lockups)) {
				$context->lockups[$chunk_id] = array();
			}
			
			# append
			$context->lockups[$chunk_id][] = $lockup;
		}


		return self::renderView('lockup_library', $context);
	}

}