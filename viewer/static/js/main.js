// Require.js allows us to configure shortcut aliases
require.config({
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        backbone_tastypie: 'libs/backbone/backbone-tastypie'
    }
});

require([
    // Load our app module and pass it to our definition function
    'app'
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});