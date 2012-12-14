# Mimeo 
	mimeograph |ˈmɪmɪəgrɑːf|
	noun
	a duplicating machine which produces copies from a stencil, now superseded by the photocopier.
- a copy produced on a mimeograph.


_m( 'M' ).wider( fn );
_m( 'M' ).equal( fn );
_m( 'M' ).narrower( fn );

_m( 'M' )
	.wider( fn )
	.equal( fn )
	.narrower( fn );

_m.narrower( 'M' );
_m.equals( 'M' );
_m.wider( 'M' );

_m.include( 'mod' );
_m.include([ 'mod', 'mod2' ]);

window.addEventListener('breakpointchange', fn, false);

_m.breakpoints = {
    'S': 1,
    'M': 500,
    'L': 680,
    'XL': 768
};

_m.modules = {
    mod1: 'js/demo/module1.js',
    mod3: {
        test: !!('placeholder' in document.createElement('input')),
        yep: ['js/demo/module3.js']
    }
};