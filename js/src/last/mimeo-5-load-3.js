
// Adding custom JavaScript and CSS modules to be lazy loaded once
// no matter how many times they're added.


(function (doc, undefined) {

	'use strict';

	var container = doc.createElement('div'),
		allModules = M.allModules,
		modulesIncluded = M.modulesIncluded,
		addScript,
		addScripts;

	console.log(M);

	addScript = function (file) {
		var s = doc.createElement('script');
		s.src = file;
		s.async = true;
		container.appendChild(s);
	};

	addScripts = function (files) {
		_.each(files, addScript);
	};

	//	if ( isDebugMode ) {
	//		addScript = addScripts = yepnope;
	//	}

	_.each(modulesIncluded, function (num, key) {

		var module = allModules[key];

		if (module === undefined || !_.has(allModules, key)) {
			console.error('JS-module not loaded. Module ' + key + ' does not exist.', 'error');
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


}(document));
