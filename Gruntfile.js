/**
 * Created by Aaron on 7/9/2015.
 */

module.exports = function( grunt ) {

    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-banner' );

    var LICENSE = '/****\n * ' +
                  grunt.file.read( './LICENSE', {encoding: 'utf-8'} ).replace( /\n/ig, '\n * ' ) +
                  '\n ****/';

    grunt.initConfig( {
        babel:     {
            options: {
                ast:          false,
                sourceMaps:   false,
                nonStandard:  false,
                compact:      "false",
                modules:      "umd",
                experimental: true
            },
            build:   {
                options: {
                    loose:    "all",
                    optional: [
                        'spec.undefinedToVoid',
                        'minification.constantFolding',
                        'minification.propertyLiterals',
                        'es7.classProperties'
                    ]
                },
                files:   [{
                    expand: true,
                    cwd:    './src/',
                    src:    './**/*.js',
                    dest:   './build/'
                }]
            },
            tests:   {
                loose:   "all",
                options: {
                    optional: [
                        'spec.undefinedToVoid',
                        'minification.constantFolding',
                        'minification.propertyLiterals'
                    ]
                },
                files:   [{
                    expand: true,
                    cwd:    './test/src/',
                    src:    './**/*.js',
                    dest:   './test/build/'
                }]
            }
        },
        usebanner: {
            license: {
                options: {
                    position:  'top',
                    banner:    LICENSE,
                    linebreak: true
                },
                files:   {
                    src: ['./build/**/*.js']
                }
            }
        },
        clean:     {
            build: {
                src: ['./build']
            },
            tests: {
                src: ['./test/build']
            }
        }
    } );

    grunt.registerTask( 'build', ['clean:build', 'babel:build', 'usebanner:license'] );

    grunt.registerTask( 'build-tests', ['clean:tests', 'babel:tests'] );

    grunt.registerTask( 'default', ['build', 'build-tests'] );
};
