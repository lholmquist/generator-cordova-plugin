'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var plugman = require('plugman');

var PlatformGenerator = module.exports = function PlatformGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log('You called the platform subgenerator with the argument ' + this.name + '.');
};

util.inherits(PlatformGenerator, yeoman.generators.NamedBase);

PlatformGenerator.prototype.askFor = function askFor() {
    var cb = this.async(),
        prompts = [];

    // have Yeoman greet the user.
    console.log(this.yeoman);
    if( this.name === 'add' ) {
        prompts = [{
            name: 'platformName',
            message: 'Enter a Platform to add',
            type: 'list',
            choices: [ 'android', 'ios' ],
            default: 'android'
        }];
    } //else if( this.name === 'remove' ) {
    //     prompts = [{
    //         name: 'platformName',
    //         message: 'Enter a Platform to remove',
    //         default: 'android'
    //     }];
    // }

    if( !prompts.length ) {
        console.log( this.name + ' is not a valid option' );
    }

    this.prompt(prompts, function (props) {

        for( var prop in props ) {
            this[ prop ] = props[ prop ];
        }

        cb();
    }.bind(this));
};

PlatformGenerator.prototype.doPlatformStuff = function addPlatform() {
    plugman.platform( this.platformName, function( err ) {
        if( err ) {
            console.log( err );
        }
    });
};

PlatformGenerator.prototype.files = function files() {
    //this.copy('somefile.js', 'somefile.js');
};
