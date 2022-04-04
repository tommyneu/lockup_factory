'use strict';

/* globals define: false */

define(['wdn', 'ready', 'dropdown-widget', 'require'], function (WDN, ready, DropDownWidget, require) {
	"use strict";

	var getLinkByRel = function getLinkByRel(name) {
		return document.querySelector('link[rel=' + name + ']');
	},
	    getLocalIdmSettings = function getLocalIdmSettings() {
		var loginLink = getLinkByRel('login'),
		    logoutLink = getLinkByRel('logout');

		if (loginLink) {
			WDN.setPluginParam('idm', 'login', loginLink.getAttribute('href'));
		}
		if (logoutLink) {
			WDN.setPluginParam('idm', 'logout', logoutLink.getAttribute('href'));
		}

		return WDN.getPluginParam('idm') || {};
	},
	    loginSrv = 'https://shib.unl.edu/',
	    ssoCook = 'unl_sso',
	    encLoc = encodeURIComponent(window.location),
	    logoutURL = loginSrv + 'idp/profile/cas/logout?url=' + encLoc,
	    loginURL = loginSrv + 'idp/profile/cas/login?service=' + encLoc,
	    serviceURL = 'https://whoami.unl.edu/?id=',
	    avatarService = 'https://directory.unl.edu/avatar/',
	    departmentLookup = 'https://directory.unl.edu/departments/',
	    userLookup = 'https://directory.unl.edu/people/',
	    planetRed = 'https://planetred.unl.edu/pg/',
	    user = false,
	    sessionUser = false;

	var getUserField = function getUserField(field) {
		if (!user || !user[field]) {
			return false;
		}

		return user[field][0];
	};

	var Plugin = {
		initialize: function initialize(callback) {
			var loginCheckFailure = function loginCheckFailure() {
				ready(function () {
					var localSettings = getLocalIdmSettings();
					if (localSettings.login) {
						Plugin.setLoginURL(localSettings.login);
					}

					Plugin.renderAsLoggedOut();
				});

				if (callback) {
					callback();
				}
			},
			    cookie = WDN.getCookie(ssoCook);

			if (cookie) {
				require([serviceURL + cookie], function () {
					// the whoami service injects into WDN.idm namespace
					if (WDN.idm.user) {
						Plugin.setSessionUser(WDN.idm.user);
						delete WDN.idm.user;
					}

					if (Plugin.isLoggedIn()) {
						if (callback) {
							callback();
						}
						ready(function () {
							Plugin.renderAsLoggedIn();
						});
					} else {
						// User's CAS session is no longer active, kill cookie
						Plugin.logout();
						loginCheckFailure();
					}
				});
			} else {
				loginCheckFailure();
			}
		},

		/**
   * Set the current user. The object should have fields as described by CAS
   *
   * @param newUser object|false
   */
		setSessionUser: function setSessionUser(newUser) {
			sessionUser = newUser;
			user = newUser;
		},

		/**
   * Set the current user. The object should have fields as described by CAS
   *
   * @param newUser object|false
   */
		setUser: function setUser(newUser) {
			user = newUser;
		},

		formatUser: function formatUser(userinfo, extras) {
			var data = {};

			// Set user to passed user
			Plugin.setUser(userinfo);

			if (user) {
				data.unlID = Plugin.getUserId();
				data.firstName = Plugin.getFirstName();
				data.lastName = Plugin.getLastName();
				data.fullName = getUserField('displayName');
				data.displayName = Plugin.getDisplayName();
				data.emailAddress = Plugin.getEmailAddress();
				data.postalAddress = Plugin.getPostalAddress();
				data.phoneNumber = Plugin.getTelephoneNumber();
				data.title = Plugin.getTitle();
				data.orgUnitNumber = Plugin.getPrimaryHROrgUnitNumber();
				data.orgUnitName = getUserField('unlHRPrimaryDepartment');
				data.primaryAffiliation = Plugin.getPrimaryAffiliation();
				data.avatar = user.imageURL;
				data.profileUrl = Plugin.getProfileURL();

				if (extras && extras.department === true) {
					data.department = Plugin.getDepartment(data.orgUnitNumber);
				}
			}

			// Unset user
			Plugin.setUser(false);

			return data;
		},

		getSessionUser: function getSessionUser(extras) {
			return Plugin.formatUser(sessionUser, extras);
		},

		getUser: function getUser(uid, extras) {
			var xhrUser = false;
			var xhr = new XMLHttpRequest();
			// force synchronous response
			xhr.open('GET', userLookup + uid + '.json', false);
			xhr.send(null);
			if (xhr.status === 200) {
				xhrUser = JSON.parse(xhr.responseText);
			}
			return Plugin.formatUser(xhrUser, extras);
		},

		getDepartment: function getDepartment(org_unit) {
			if (!org_unit) {
				return {};
			}

			var xhr = new XMLHttpRequest();
			// force synchronous response
			xhr.open('GET', departmentLookup + org_unit + '?format=json', false);
			xhr.send(null);
			if (xhr.status === 200) {
				return JSON.parse(xhr.responseText);
			}
		},

		logout: function logout() {
			WDN.setCookie(ssoCook, '0', -1);
			user = false;
		},

		/**
   * Checks if the user is logged in
   *
   * @return bool
   */
		isLoggedIn: function isLoggedIn() {
			return !!sessionUser && sessionUser && sessionUser.uid;
		},

		/**
   * Returns the uid of the logged in user.
   *
   * @return string
   */
		getUserId: function getUserId() {
			return user && user.uid;
		},

		/**
   * Get the logged in user's display name (full name)
   *
   * @returns {string}
   */
		getDisplayName: function getDisplayName() {
			var disp_name = '';
			if (user.eduPersonNickname) {
				disp_name = user.eduPersonNickname[0];
			} else if (user.givenName) {
				disp_name = user.givenName[0];
			} else if (user.displayName) {
				disp_name = user.displayName[0];
			}

			return disp_name;
		},

		/**
   * Get the logged in user's last name only
   *
   * @returns {false|string}
   */
		getFirstName: function getFirstName() {
			return getUserField('givenName');
		},

		/**
   * Get the logged in user's first name only
   *
   * @returns {false|string}
   */
		getLastName: function getLastName() {
			return getUserField('sn');
		},

		/**
   * Get the logged in user's primary affiliation.  IE: staff or faculty
   *
   * @returns {false|string}
   */
		getPrimaryAffiliation: function getPrimaryAffiliation() {
			return getUserField('eduPersonPrimaryAffiliation');
		},

		/**
   * Get the logged in user's email address
   *
   * @returns {false|string}
   */
		getEmailAddress: function getEmailAddress() {
			return getUserField('mail');
		},

		/**
   * Get the logged in user's postal address
   *
   * @returns {false|string}
   */
		getPostalAddress: function getPostalAddress() {
			return getUserField('postalAddress');
		},

		/**
   * Get the logged in user's telephone number
   *
   * @returns {false|string}
   */
		getTelephoneNumber: function getTelephoneNumber() {
			return getUserField('telephoneNumber');
		},

		/**
   * Get the logged in user's title
   *
   * @returns {false|string}
   */
		getTitle: function getTitle() {
			return getUserField('title');
		},

		/**
   * Get the logged in user's primary hr org unit number
   *
   * @returns {false|string}
   */
		getPrimaryHROrgUnitNumber: function getPrimaryHROrgUnitNumber() {
			return getUserField('unlHROrgUnitNumber');
		},

		/**
   * Get the profile (planet red) URL
   *
   * @returns {string}
   */
		getProfileURL: function getProfileURL() {
			if (!this.isLoggedIn()) {
				return false;
			}

			var uid = this.getUserId();

			// in planet red's use of CAS, staff usernames are converted like jdoe2 -> unl_jdoe2
			//  and student usernames are converted like s-jdoe3 -> unl_s_jdoe3
			var planetred_uid = 'unl_';
			if (uid.substring(2, 0) === 's-') {
				planetred_uid += uid.replace('-', '_');
			} else {
				planetred_uid += uid;
			}

			return planetRed + 'profile/' + planetred_uid;
		},

		/**
   * Update the SSO tab and display user info
   */
		renderAsLoggedIn: function renderAsLoggedIn() {
			var _this = this;

			// We need to set up multiples of these so that focus order is correct.
			var widgetContainers = document.querySelectorAll('.dcf-idm');
			var localSettings = getLocalIdmSettings();

			// Loop over each widget and create the needed elements
			// TODO: resolve differences between 'mobile' and 'desktop' layouts

			var _loop = function _loop(i) {
				var button = document.createElement('BUTTON');
				button.classList.add('dcf-idm-login', 'dcf-d-flex', 'dcf-ai-center', 'dcf-jc-center', 'dcf-relative', 'dcf-h-100%', 'dcf-w-100%', 'dcf-p-0', 'dcf-b-0', 'dcf-bg-transparent', 'unl-font-sans', 'unl-scarlet');
				button.setAttribute('id', 'dcf-idm-toggle');
				button.setAttribute('aria-haspopup', 'true');
				button.setAttribute('aria-expanded', 'false');
				button.setAttribute('aria-controls', 'dcf-idm-options-' + i);
				button.setAttribute('aria-label', 'Account actions for ' + _this.getDisplayName());

				var img = document.createElement('IMG');
				img.classList.add('dcf-idm-img', 'dcf-txt-sm', 'dcf-h-6', 'dcf-w-6', 'dcf-circle', 'unl-bg-cream');
				img.setAttribute('src', avatarService + _this.getUserId());
				img.setAttribute('alt', '');
				button.appendChild(img);

				var displayName = document.createElement('SPAN');
				displayName.classList.add('dcf-idm-label', 'dcf-txt-2xs', 'dcf-truncate');
				displayName.innerText = _this.getDisplayName();
				button.appendChild(displayName);

				//Set up the IDM options
				var optionsContainer = document.createElement('DIV');
				optionsContainer.classList.add('dcf-idm-options', 'dcf-absolute', 'dcf-pt-6', 'dcf-pr-5', 'dcf-pb-5', 'dcf-pl-5', 'dcf-z-1', 'dcf-bg-overlay-dark');
				optionsContainer.setAttribute('id', 'dcf-idm-options-' + i);
				optionsContainer.hidden = true;

				var navUL = document.createElement('UL');
				navUL.classList.add('dcf-list-bare', 'dcf-mb-0', 'dcf-txt-2xs', 'unl-font-sans');

				var profileLI = document.createElement('LI');
				var profileLink = document.createElement('A');
				profileLink.classList.add('unl-cream');
				profileLink.setAttribute('href', _this.getProfileURL());
				profileLink.innerText = 'View Profile';
				profileLI.appendChild(profileLink);
				navUL.appendChild(profileLI);

				var logoutLI = document.createElement('LI');
				var logoutLink = document.createElement('A');
				logoutLink.classList.add('unl-cream');
				logoutLink.setAttribute('href', logoutURL);
				logoutLink.innerText = 'Logout';
				logoutLI.appendChild(logoutLink);
				navUL.appendChild(logoutLI);

				optionsContainer.appendChild(navUL);

				//clear any existing HTML
				var loggedOutContainer = widgetContainers[i].querySelector('.dcf-idm-status-logged-out');
				var loggedInContainer = widgetContainers[i].querySelector('.dcf-idm-status-logged-in');
				loggedInContainer.innerHTML = '';

				loggedInContainer.appendChild(button);
				loggedInContainer.appendChild(optionsContainer);

				//Initialize the dropdown nav
				var dropdownNav = new DropDownWidget(loggedInContainer, 'idm-logged-in');
				var closeNavEvent = new CustomEvent('closeNavigation');
				var closeSearchEvent = new CustomEvent('closeSearch');
				document.addEventListener('openDropDownWidget', function (e) {
					if (e.detail.type == 'idm-logged-in') {
						document.dispatchEvent(closeNavEvent);
						document.dispatchEvent(closeSearchEvent);
					}
				});

				//Show the contents
				loggedOutContainer.hidden = true;
				loggedInContainer.hidden = false;

				// Any time logout link is clicked, unset the user data
				logoutLink.removeEventListener('click', Plugin.logout);
				logoutLink.addEventListener('click', Plugin.logout);

				Plugin.setLogoutURL(localSettings.logout);
				logoutLink.setAttribute('href', logoutURL);
			};

			for (var i = 0; i < widgetContainers.length; i++) {
				_loop(i);
			}

			// Trigger idm is ready
			window.dispatchEvent(new Event('idmStateSet'));
		},

		renderAsLoggedOut: function renderAsLoggedOut() {
			if (Plugin.isLoggedIn()) {
				//if the user is already logged in, we should not reset the login
				return;
			}

			var widgetContainers = document.querySelectorAll('.dcf-idm');

			for (var i = 0; i < widgetContainers.length; i++) {
				var loggedOutContainer = widgetContainers[i].querySelector('.dcf-idm-status-logged-out');
				var loggedInContainer = widgetContainers[i].querySelector('.dcf-idm-status-logged-in');
				var loginLink = loggedOutContainer.querySelector('a');

				loginLink.setAttribute('href', loginURL);
				loggedInContainer.hidden = true;
				loggedOutContainer.hidden = false;
			}
			// Trigger idm is ready
			window.dispatchEvent(new Event('idmStateSet'));
		},

		/**
   * Set the URL to send the user to when the logout link is clicked
   */
		setLogoutURL: function setLogoutURL(url) {
			if (url) {
				logoutURL = url;
			}
		},

		/**
   * Set the URL to send the user to when the login link is clicked
   */
		setLoginURL: function setLoginURL(url) {
			if (url) {
				loginURL = url;
			}
		}
	};

	WDN.idm = {}; // must expose the WDN.idm namespace for the whoami service
	return Plugin;
});
