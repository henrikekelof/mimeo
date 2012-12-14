/*global _m */

_m.breakpoints = {
    //----- Edit breakpoints list here: -----//
    'S': 1,
    'M': 500,
    'L': 680,
    'XL': 768
};

_m.modules = {
    //----- Edit modules list here: -----//
    mod1: 'js/demo/module1.js',
    mod3: {
        test: !!('placeholder' in document.createElement('input')),
        yep: ['js/demo/module3.js']
    }
};
