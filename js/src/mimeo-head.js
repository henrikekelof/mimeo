// Mimeo v1.0 | Henrik Ekelöf - @henrikekelof | https://github.com/henrikekelof/mimeo

/*global _ */

var _m;

(function (undefined) {

    'use strict';
    
    var Mimeo, mimeo,
		current, instances = {};

	function hasKey(query) {
		return (query && _.has(_m.breakpoints, query));
	}

	function value(query) {
		if (hasKey(query)) {
			return _m.breakpoints[query];
		}
	}

	function narrowerThan(query) {
		return (hasKey(query) && value(current) < value(query));
	}

	function equals(query) {
		return (hasKey(query) && value(current) === value(query));
	}

	function widerThan(query) {
		return (hasKey(query) && value(current) > value(query));
	}

    window._m = function (query) {
		if (_.isString(query) && hasKey(query)) {
			if (!instances.hasOwnProperty(query)) {
				instances[query] = new Mimeo(query);
			}
			return instances[query];
		} else {
			return mimeo;
		}
    };

    Mimeo = function (query) {
		if (query) {
			this.query = query;
		}
    };

    _m.fn = Mimeo.prototype = {
		wider: function (fn, args) {
			if (_.isFunction(fn) && this.query && widerThan(this.query)) {
				fn(args);
			}
			return this;
		},
		equal: function (fn, args) {
			if (_.isFunction(fn) && this.query && equals(this.query)) {
				fn(args);
			}
			return this;
		},
		narrower: function (fn, args) {
			if (_.isFunction(fn) && this.query && narrowerThan(this.query)) {
				fn(args);
			}
			return this;
		}
    };

    _m.set = function (breakpoint) {
		if (hasKey(breakpoint)) {
			_m.current(breakpoint);
			return true;
		}
		return false;
	};

	_m.current = function (breakpoint) {
		if (breakpoint && _.isString(breakpoint) && hasKey(breakpoint)) {
			current = breakpoint;
		} else {
			return current;
		}
	};

	_m.narrowerThan = narrowerThan;
	_m.equals = equals;
	_m.widerThan = widerThan;

    mimeo = new Mimeo();

}());


(function () {
 
	'use strict';

	var modulesIncluded = { },
		modulesLength = 0,
		i, l;

	function addModules(mods) {
		if (!modulesIncluded[mods]) {
			modulesIncluded[mods] = true;
			modulesLength += 1;
		}
	}

	function include(mods) {

		if (typeof mods === 'string') {
			addModules(mods);
		} else {
			for (i = 0, l = mods.length; i < l; i += 1) {
				addModules(mods[i]);
			}
		}
	}

	_m.include = include;
	_m.included = modulesIncluded;
	
}());



