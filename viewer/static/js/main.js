// Require.js allows us to configure shortcut aliases
require.config({
    'paths': {
        'underscore': 'libs/underscore/underscore-min',
        'backbone': 'libs/backbone/backbone-min',
        'tastypie': 'libs/backbone/backbone-tastypie'
    },
    'shim':
    {
        backbone: {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        underscore: {
            'exports': '_'
        },
        tastypie: {
            'deps': ['backbone'],
            'exports': 'Tastypie'
        }
    }
});

require([
    // Load our app module and pass it to our definition function
    'underscore',
    'backbone',
    'tastypie',
    'app'
], function(_, Backbone, Tastypie, App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});