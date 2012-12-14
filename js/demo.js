/*global console, _m */

(function () {
	
	'use strict';

	// _m.queue(function () { console.log('test1'); });
	// _m.queue(function () { console.log('test2'); });
	// _m.queue();
	// _m.queue();
	// _m.queue();

	_m.include('demo1');
	_m.include('demo2');
	_m.include(['demo3', 'demo4']);
	console.log(_m.included);
	console.log(_m.modules);

	console.log(_m.breakpoints);

	console.log(_m('S'));

	

	console.log('==NARROWER==' + _m.wider('M'));

	
	window.addEventListener('load', function () {
		console.log('==NARROWER==' + _m.wider('M'));
	}, false);

	
    function setSize(s) {
        document.getElementById('size').innerHTML = _m.current();
        document.getElementById('width').innerHTML = document.documentElement.clientWidth;
    }

    window.addEventListener('breakpointchange', setSize, false);


    if (window.addEventListener) {

        
	window.addEventListener('breakpointchange', function() {
        'use strict';
        console.log('EVENT!');
        console.log(_m('M'));
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
}());


