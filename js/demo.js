/*global console, _m, yepnope */

var demo = {};

(function (doc, docElm) {

	'use strict';
	
	var size = document.getElementById('size'),
		log = document.getElementById('log'),
		width = document.getElementById('width');

	demo.log = function (msg) {
		var html = log.innerHTML;
		msg = '<li>' + msg + '</li>';
		html = msg + html;
		log.innerHTML = html;
	};

	function setSize() {
        size.innerHTML = _m.current();
        width.innerHTML = docElm.clientWidth;
    }

    if (window.addEventListener) {

		window.addEventListener('breakpointchange', setSize, false);

		window.addEventListener('breakpointchange', function () {
			
			_m('M')
				.narrower(function () {
					console.log('Narrower than M');
				})
				.equal(function () {
					console.log('Equal to M');
				})
				.wider(function () {
					console.log('Wider than M. Loading mod 2');
					yepnope(['js/demo/module2.css', 'js/demo/module2.js']);
				});
		}, false);
    }
    
}(document, document.documentElement));


