module.exports = function( grunt ) {

    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-banner' );

    var LICENSE = '/****\n * ' +
                  grunt.file.read( './LICENSE', {encoding: 'utf-8'} ).replace( /\n/ig, '\n * ' ) +
                  '\n ****/';

    grunt.initConfig( {
        babel:     {
            options:   {
                ast:          false,
                sourceMaps:   false,
                nonStandard:  false,
                compact:      "false",
                modules:      "umd",
                experimental: true
            },
            build:     {
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
            benchmark: {
                loose:   "all",
                options: {
                    blacklist: [
                        'es3.memberExpressionLiterals',
                        'es3.propertyLiterals',
                        'regenerator', //es6.generators
                        'es6.properties.shorthand'
                    ],
                    optional:  [
                        'spec.undefinedToVoid',
                        'minification.constantFolding',
                        'minification.propertyLiterals'
                    ]
                },
                files:   [{
                    expand: true,
                    cwd:    './benchmark/src/',
                    src:    './**/*.js',
                    dest:   './benchmark/build/'
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
            build:     {
                src: ['./build']
            },
            benchmark: {
                src: ['./benchmark/build']
            }
        }
    } );

    grunt.registerTask( 'build', ['clean:build', 'babel:build', 'usebanner:license'] );

    grunt.registerTask( 'build-benchmark', ['clean:benchmark', 'babel:benchmark'] );

    grunt.registerTask( 'default', ['build', 'build-benchmark'] );
};
