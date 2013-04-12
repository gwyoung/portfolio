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
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                // allow cross-domain requests
                // remote server allows CORS
                return true;
            }
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