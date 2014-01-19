module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                "Gruntfile.js",
                "toposort.js",
                "test/spec.js"
            ]
        },
        jscs: {
            all: "<%= jshint.all %>"
        },
        mochaTest: {
            spec: {
                options: {
                    reporter: "spec",
                    ui: "tdd"
                },
                src: "test/spec.js"
            }
        },
        mocha: {
            spec: {
                options: {
                    run: true
                },
                src: "test/index.html"
            }
        }
    });

    // Copy browser testing stuff
    grunt.file.copy( "node_modules/mocha/mocha.js", "test/lib/mocha.js" );
    grunt.file.copy( "node_modules/chai/chai.js", "test/lib/chai.js" );

    // Load dependencies
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-jscs-checker" );
    grunt.loadNpmTasks( "grunt-mocha" );
    grunt.loadNpmTasks( "grunt-mocha-test" );

    grunt.registerTask( "default", [ "jshint", "jscs", "mocha", "mochaTest" ] );
};
