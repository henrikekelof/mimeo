/*global _m, _, Modernizr, yepnope */

(function (win, doc) {

	'use strict';

	var detector = doc.getElementById('mimeo-detect-breakpoint'),
		transitionEndNames, transitionEndName, previousBreakpoint;

	function getCss(elm, prop) {
		//http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
		var val = '';
		if (doc.defaultView && doc.defaultView.getComputedStyle) {
			val = doc.defaultView.getComputedStyle(elm, '').getPropertyValue(prop);
		}
		else if (elm.currentStyle) {
			prop = prop.replace(/\-(\w)/g, function (strMatch, p) {
				return p.toUpperCase();
			});
			val = elm.currentStyle[prop];
		}
		return val;
	}

	transitionEndNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'transitionend',
		'msTransition': 'MsTransitionEnd',
		'transition': 'transitionend'
	};

	transitionEndName = transitionEndNames[Modernizr.prefixed('transition')];
	previousBreakpoint = _m.current();
	 
	function watchBreakpoint() {

		var currentBreakpoint = getCss(detector, 'font-family'),
			evt;

		if (currentBreakpoint !== previousBreakpoint && _m.set(currentBreakpoint)) {
			previousBreakpoint = currentBreakpoint;
			if (doc.createEvent) {
				evt = doc.createEvent('Event');
				evt.initEvent('breakpointchange', true, true);
				win.dispatchEvent(evt);
			}
		}

	}

	if (transitionEndName !== undefined && doc.body.addEventListener) {
		doc.body.addEventListener(transitionEndName, watchBreakpoint, false);
	} else if (win.addEventListener) {
		win.addEventListener('resize', _.throttle(watchBreakpoint, 500), false);
	}

	setTimeout(watchBreakpoint, 1);

}(window, document));



// Adding custom JavaScript and CSS modules to be lazy loaded once
// no matter how many times they're added.

(function () {

	'use strict';

	var doc = document,
		container = doc.createElement('div'),
		allModules = _m.modules,
		modulesIncluded = _m.included,
		addScript,
		addScripts;

	if (!window.console) {
		window.console = {
			error: function () {}
		};
	}

	addScript = function (file) {
		var s = doc.createElement('script');
		s.src = file;
		s.async = true;
		container.appendChild(s);
	};

	addScripts = function (files) {
		_.each(files, addScript);
	};

	_.each(modulesIncluded, function (num, key) {

		var module = allModules[key];

		if (module === undefined || !_.has(allModules, key)) {
			window.console.error('JS-module not loaded. Module ' +
				key + ' does not exist.', 'error');
			return;
		}

		if (_.isArray(module)) {
			addScripts(module);
		} else if (_.isString(module)) {
			addScript(module);
		} else {
			yepnope(module);
		}

	});

	doc.body.appendChild(container);

}());

