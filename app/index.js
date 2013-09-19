'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CordovaPluginGenerator = module.exports = function CordovaPluginGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovaPluginGenerator, yeoman.generators.Base);

CordovaPluginGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'pluginName',
        message: 'Enter ther plugin name:',
        default: 'coolPlugin'
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
    this.mkdir('src');
    this.mkdir('www');

    this.template('_plugin.js', 'www/plugin.js');
    this.template('_plugin.xml', 'plugin.xml');
};

CordovaPluginGenerator.prototype.projectfiles = function projectfiles() {
    this.template('_README.md', 'README.md');
    this.copy('_package.json','package.json');
};
