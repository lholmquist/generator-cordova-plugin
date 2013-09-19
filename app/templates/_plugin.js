( function() {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

    var <%= pluginName %> = function() {
        this.options = {};
    };

    <%= pluginName %>.prototype = {
        /*
            Add your plugin methods here
        */
        superCoolMethod: function( success, error ) {
            cordova.exec( success, error, "<%= pluginName %>", "superCoolMethod", [] );
        }
    };

    cordovaRef.addConstructor( function() {
        window.<%= pluginName %> = new <%= pluginName %>();
    });

})();
