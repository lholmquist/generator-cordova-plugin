/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
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
        var expected = [
            'www/plugin.js',
            'README.md',
            'plugin.xml',
            'src/'
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

