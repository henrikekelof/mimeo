/*global _, Modernizr, B */
//
//(function (doc) {
//
//	'use strict';
//
//	doc.head || (doc.head = doc.getElementsByTagName('head')[0]);
//
//
//}(window.document));
//
//

(function (win, doc) {

	'use strict';

	var breakpoints, BreakPoint, main,
		detector, instances,
		transitionEndNames, transitionEndName, previousBreakpoint;

	breakpoints = {
		'legacy': 1,
		'mobile': 320,
		'wide-mobile': 480,
		'tablet': 768,
		'desktop': 980
	};

	detector = doc.getElementById('bpm');

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

	function value(query) {
		if (!hasKey(query)) {
			return undefined;
		}
		return breakpoints[query];
	}

	function hasKey(query) {
		return _.has(breakpoints, query);
	}

	function setCurrent(breakpoint) {
		if (hasKey(breakpoint)) {
			B.current = breakpoint;
			return true;
		}
		return false;
	}

	function narrowerThan(query) {
		if (query !== undefined && hasKey(query)) {
			return value(B.current) < value(query);
		}
		return undefined;
	}

	function equals(query) {
		if (query !== undefined && hasKey(query)) {
			return value(B.current) === value(query);
		}
		return undefined;
	}

	function widerThan(query) {
		if (query !== undefined && hasKey(query)) {
			return value(B.current) > value(query);
		}
		return undefined;
	}

	BreakPoint = function (query) {
		if (query) {
			this.query = query;
		}
		return this;
	};

	BreakPoint.prototype = {
		wider: function (fn) {
			if (_.isFunction(fn) && this.query && widerThan(this.query)) {
				fn();
			}
			return this;
		},
		equal: function (fn) {
			if (_.isFunction(fn) && this.query && equals(this.query)) {
				fn();
			}
			return this;
		},
		narrower: function (fn) {
			if (_.isFunction(fn) && this.query && narrowerThan(this.query)) {
				fn();
			}
			return this;
		}
	};

	main = new BreakPoint(undefined);

	instances = {};

	win.B = function (query) {
		if (_.isString(query) && hasKey(query)) {
			if (!instances.hasOwnProperty(query)) {
				instances[query] = new BreakPoint(query);
			}
			return instances[query];

		} else {
			return main;
		}
	};

	B.fn = BreakPoint.prototype;

	B.narrowerThan = function (query) {
		return narrowerThan(query);
	};

	B.equals = function (query) {
		return equals(query);
	};

	B.widerThan = function (query) {
		return widerThan(query);
	};

	setCurrent(getCss(detector, 'font-family'));

	transitionEndNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'transitionend',
		'msTransition': 'MsTransitionEnd',
		'transition': 'transitionend'
	};

	transitionEndName = transitionEndNames[Modernizr.prefixed('transition')];
	previousBreakpoint = B.current;

	function watchBreakpoint() {

		var currentBreakpoint = getCss(detector, 'font-family'),
			evt;

		if (currentBreakpoint !== previousBreakpoint && setCurrent(currentBreakpoint)) {
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
	} else {
		
	}

	setTimeout(watchBreakpoint, 1);

}(window, window.document));


document.getElementById('bp').innerHTML = '' + B.current + ' ' + B.narrowerThan('tablet');

if (window.addEventListener) {

	window.addEventListener('breakpointchange', function () {

		'use strict';
		//console.log('Event triggered');
		document.getElementById('bp').innerHTML = B.current +
			' ' + B.narrowerThan('tablet');

		B('wide-mobile')
			.wider(function () { console.log('Is wider than wide-mobile'); })
			.equal(function () { console.log('Is equal to wide-mobile'); })
			.narrower(function () { console.log('Is narrower than wide-mobile'); });

		B('tablet')
			.wider(function () { console.log('Is wider than tablet'); })
			.equal(function () { console.log('Is equal to tablet'); })
			.narrower(function () { console.log('Is narrower than tablet'); });

	}, false);

}

