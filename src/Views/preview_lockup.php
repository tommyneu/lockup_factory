<div class="wdn-band">
	<div class="wdn-inner-wrapper">
		<h3>Preview for "<?php echo $context->lockup->organization ?>" Logo Lockup</h3>
		<?php echo $context->lockup->preview_svg; ?>

		<form method="POST" action="/lockups/generate/">
			<input type="text" class="hidden" value="<?php echo $context->lockup->id ?>" name="id">
			<button type="submit" class="wdn-button wdn-button-triad">Let's do it!</button>
		</form>
	</div>
</div>