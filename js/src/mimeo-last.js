// Mimeo v1.0 | Henrik Ekelöf - @henrikekelof | https://github.com/henrikekelof/mimeo

/*global _m, _, Modernizr, yepnope */

(function (win, doc) {

	'use strict';

	var detector = doc.getElementById('mimeo-detect-breakpoint'),
		transitionEndNames, transitionEndName, previousBreakpoint;

	function getCss(elm, prop) {
		// From an old blog post by Robert Nyman:
		// http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
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
		detector.addEventListener(
			transitionEndName,
			watchBreakpoint,
			false
		);
	} else if (win.addEventListener) {
		win.addEventListener(
			'resize',
			_.throttle(watchBreakpoint, 500),
			false
		);
	}

	setTimeout(watchBreakpoint, 1);

}(window, document));


(function () {

	'use strict';

	var doc = document,
		container = doc.createElement('div'),
		modulesIncluded = _m.included,
		modulesLoaded = {},
		createScript, hasModulesToLoad, addModule, addScript, addScripts;

	addModule = function (module) {
		if (_.isArray(module)) {
			addScripts(module);
		} else if (_.isString(module)) {
			addScript(module);
		} else {
			yepnope(module);
		}
	};

	createScript = function (file) {
		var s = doc.createElement('script');
		s.src = file;
		s.async = true;
		return s;
	};

	addScript = function (file) {
		var s = createScript(file);
		container.appendChild(s);
	};

	addScripts = function (files) {
		_.each(files, addScript);
	};


	hasModulesToLoad = function (modules, onDemand, forceReload) {
		
		var appendContainer = false;

		_.each(modules, function (num, key) {

			key = onDemand ? num : key;

			if (_.has(_m.modules, key) &&
				(!onDemand || (onDemand && (forceReload || !modulesLoaded[key])))) {
				addModule(_m.modules[key]);
				modulesLoaded[key] = true;
				appendContainer = true;
			}

		});
		
		return appendContainer;

	};

	if (hasModulesToLoad(modulesIncluded)) {
		doc.body.appendChild(container);
	}

	_m.load = function (modules, forceReload) {
		
		modules = (_.isArray(modules)) ? modules : [modules];
		
		if (hasModulesToLoad(modules, true, forceReload)) {
			container = doc.createElement('div');
			doc.body.appendChild(container);
		}
		
	};

}());

