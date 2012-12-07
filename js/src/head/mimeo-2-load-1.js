
window.M = (function () {
 
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

	return {
		include: include,
		modulesIncluded: modulesIncluded,
		allModules: {}
	};

}());