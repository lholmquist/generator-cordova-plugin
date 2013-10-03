'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var plugman = require('plugman');


var CordovaPluginGenerator = module.exports = function CordovaPluginGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        console.log( 'Setup Complete' );
    });
};

util.inherits(CordovaPluginGenerator, yeoman.generators.Base);

CordovaPluginGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'pluginName',
        message: 'Enter ther plugin name:',
        default: 'CoolPlugin'
    },
    {
        name: 'pluginDesc',
        message: 'Enter a description:',
        default: 'Cool plugin description'
    },
    {
        name: 'pluginID',
        message: 'Enter the plugin ID( e.g. reverse domain notaion )',
        default: 'org.cool.plugin'
    },
    {
        name: 'pluginVersion',
        message: 'Enter the plugin Version',
        default: '0.0.1'
    }];

    this.prompt(prompts, function (props) {

        for( var prop in props ) {
            this[ prop ] = props[ prop ];
        }

        cb();
    }.bind(this));
};

CordovaPluginGenerator.prototype.app = function app() {
    var that = this;
    plugman.create( this.pluginName, this.pluginID, this.pluginVersion, '.', { 'description': this.pluginDesc }, function( err ) {
        if( err ) {
            console.log( err );
        } else {
            that.template('_README.md', 'README.md');
            that.copy('_package.json','package.json');
        }
    } );
};
