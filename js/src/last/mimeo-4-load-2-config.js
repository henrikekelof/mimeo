/*global LIB */

//window.M || (window.M = {});

(function () {

	'use strict';

	eval();

	console.log('B.widerThan(tablet)');
	console.log(B.widerThan('tablet'));

	M.allModules = {

		//----- Edit modules list here: -----//

		mod1: 'js/demo/module1.js',

		mod2: {
			test: B.widerThan('tablet'),
			yep: ['js/demo/module2.css','js/demo/module2.js'],
			complete: function () {},
			callback: function (url, result) {
				if (!result) {
					window.addEventListener('breakpointchange', function () {
						if (B.widerThan('tablet')) {
							yepnope(['js/demo/module2.css','js/demo/module2.js']);
						}
					}, false);
				}
			}
		}

		//----- Stop editing now. -----//
	};

}());

//example1: '... BUNDLE URL ...',

//example2: {
//    test: ($('.logo').exists()),
//    yep: {
//        example4: '... BUNDLE URL ...'
//    },
//    callback: function (url, result, key) {
//        LIB.log('result (yep or nope - true or false): ' + key);
//        yepnope('... BUNDLE URL ...');
//    }
//},

//example3: {
//    test: false,
//    nope: '... BUNDLE URL ...',,
//    callback: function () {
//        LIB.log('Example 3 yepnope callback executed.');
//    }
//}