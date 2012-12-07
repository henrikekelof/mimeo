/*global _ */

(function (win, undefined) {

	'use strict';

	if (win._) {
		// Assume lodash/underscore is already loaded. Exit.
		return;
	}

	///////  μ lodash  ///////

	window._ = {};

	var arrayProto = Array.prototype,
		objProto = Object.prototype,
		breaker = { },
		toString = objProto.toString,
		hasOwnProp = objProto.hasOwnProperty,
		types = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];

	function has(obj, key) {
		return hasOwnProp.call(obj, key);
	}

	function each(obj, iterator, context) {
		var i, l, key;
		if (obj === null) {
			return;
		}
		if (arrayProto.forEach && obj.forEach === arrayProto.forEach) {
			obj.forEach(iterator, context);
		} else if (obj.length === +obj.length) {
			for (i = 0, l = obj.length; i < l; i += 1) {
				if (iterator.call(context, obj[i], i, obj) === breaker) {
					return;
				}
			}
		} else {
			for (key in obj) {
				if (has(obj, key)) {
					if (iterator.call(
							context, obj[key], key, obj
						) === breaker) {
						return;
					}
				}
			}
		}
	}

	each(types, function (name) {
		_['is' + name] = function (obj) {
			return toString.call(obj) === '[object ' + name + ']';
		};
	});

	function throttle(func, wait) {
		var args,
			result,
			thisArg,
			timeoutId,
			lastCalled = 0;

		function trailingCall() {
			lastCalled = new Date();
			timeoutId = null;
			result = func.apply(thisArg, args);
		}
		return function () {
			var now = new Date(),
				remaining = wait - (now - lastCalled);

			args = arguments;
			thisArg = this;

			if (remaining <= 0) {
				clearTimeout(timeoutId);
				lastCalled = now;
				result = func.apply(thisArg, args);
			}
			else if (!timeoutId) {
				timeoutId = setTimeout(trailingCall, remaining);
			}
			return result;
		};
	}

	_.isArray = Array.isArray || function (obj) {
		return toString.call(obj) === '[object Array]';
	};

	_.each = each;
	_.has = has;
	_.throttle = throttle;

}(window));