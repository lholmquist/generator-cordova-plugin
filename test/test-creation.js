/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;


describe('cordova-plugin generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('cordova-plugin:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        if( fs.existsSync( path.join(__dirname, 'temp', 'Name') ) ) {
            fs.rmdirSync( path.join(__dirname, 'temp', 'Name') );
        }

        var expected = [
            'Name/www/Name.js',
            'Name/plugin.xml',
            'Name/src/'
        ];

        helpers.mockPrompt(this.app,
            {
                pluginName: 'Name',
                pluginID: 'org.me.thing',
                pluginVersion: '0.0.1',
                pluginDesc: 'Cool Cool'
            });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});

