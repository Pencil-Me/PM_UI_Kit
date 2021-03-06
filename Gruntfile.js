module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    var fs = require('fs');
    var path = require('path');
    var mozjpeg = require('imagemin-mozjpeg');

    var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
    var getLessVarsData = function () {
        var filePath = path.join(__dirname, 'less/variables.less');
        var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        var parser = new BsLessdocParser(fileContent);
        return { sections: parser.parseFile() };
    };

    var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

    Object.keys(configBridge.paths).forEach(function (key) {
        configBridge.paths[key].forEach(function (val, i, arr) {
            arr[i] = path.join('./docs/assets', val);
        });
    });

    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * PM-UI-Kit v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under the <%= pkg.license %> license\n' +
        ' */\n',
        jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
        jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),

        // Task configuration.
        clean: {
            css: 'dist/css',
            js: 'dist/js'
        },

        resize_crop: {
            image_group: {
                options: {
                    format: "jpg",
                    gravity: "center",
                    height: 500,
                    width: 500
                },
                files: {
                    'vendor/img/tmp': [
                        'vendor/img/original/**/*.jpg'
                    ]
                }
            }
        },

        "imagemagick-resize":{
            dev:{
                from:'vendor/img/tmp/',
                to:'vendor/img/resized/',
                files:'*.jpg',
                props:{
                    width:500,

                    srcPath: undefined,
                    srcData: null,
                    srcFormat: null,
                    dstPath: undefined,
                    quality: 0.8,
                    format: 'jpg',
                    progressive: true,
                    /*width: 0,
                    height: 0,*/
                    strip: true,
                    filter: 'Lagrange',
                    sharpening: 0.2,
                    customArgs: []
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'vendor/img/resized/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'img/'                  // Destination path prefix
                }]
            }
        },

        cmq: {
            options: {
                log: false
            },
            your_target: {
                files: {
                    'tmp': ['test/*.css']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: './vendor/javascript/.jshintrc'
            },
            core: {
                src: 'javascript/*.js'
            }
        },

        jscs: {
            options: {
                config: './vendor/javascript/.jscsrc'
            },
            core: {
                src: '<%= jshint.core.src %>'
            }
        },

        uglify: {
            options: {
                sourceMap: {
                    includeSources: true
                },
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: /^!|@preserve|@license|@cc_on/i
            },
            core: {
                src: 'vendor/javascript/*.js',
                dest: 'dist/javascript/<%= pkg.name %>.min.js'
            }
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
                },
                src: './vendor/less/<%= pkg.name %>.less',
                dest: './dist/css/<%= pkg.name %>.css'
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>-theme.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
                },
                src: 'less/theme.less',
                dest: 'dist/css/<%= pkg.name %>-theme.css'
            }
        },

        sass: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.gen.css.map',
                    sourceMapFilename: 'dist/css/<%= pkg.name %>.gen.css.map'
                },
                src: './vendor/scss/<%= pkg.name %>.scss',
                dest: './dist/css/<%= pkg.name %>.gen.css'
            }
        },

        sasslint: {
            options: {
                configFile: './grunt/.sass-lint.yml',
                formatter: 'junit',
                outputFile: './reports/sasslint-report.xml'
            },
            target: ['./vendor/scss/\*.scss']
        },

        csslint: {
            options: {
                csslintrc: './grunt/.csslintrc'
            },
            dist: [
                'dist/css/<%= pkg.name %>.css'
            ]
        },

        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/css/maps/' // ...to the specified directory
                },
                processors: [
                    require('autoprefixer')()
                    //require('cssnano')(),
                    //require('rtlcss')()
                ]
            },
            dist: {
                src: 'dist/css/<%= pkg.name %>.gen.css',
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },

        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                sourceMapInlineSources: true,
                advanced: false
            },
            minifyCore: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        },

        csscomb: {
            options: {
                config: './grunt/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/'
            }
        },

        pug: {
            options: {
                pretty: true,
                data: getLessVarsData
            },
            customizerVars: {
                src: 'docs/_pug/customizer-variables.pug',
                dest: 'docs/_includes/customizer-variables.html'
            },
            customizerNav: {
                src: 'docs/_pug/customizer-nav.pug',
                dest: 'docs/_includes/nav/customize.html'
            }
        },

        watch: {
            // src: {
            //     files: '<%= jshint.core.src %>',
            //     tasks: ['jshint:core', 'qunit', 'concat']
            // },
            less: {
                files: './vendor/less/**/*.less',
                tasks: 'dist-less-css'
            },
            scss: {
                files: './vendor/scss/**/*.scss',
                tasks: 'dist-sass-css'
            }
        },

        lessToSass: {
            convert: {
                files: [{
                    expand: true,
                    cwd: 'vendor/less/',
                    src: ['*.less'],
                    ext: '.scss',
                    dest: 'vendor/scss/'
                }]
            }
        }

    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);


    var runSubset = function (subset) {
        return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
    };

    // Test task.
    var testSubtasks = [];
    // Skip core tests if running a different subset of the test suite
    if (runSubset('core') &&
        // Skip core tests if this is a Savage build
        process.env.TRAVIS_REPO_SLUG !== 'twbs-savage/pm-ui-kit') {
        //testSubtasks = testSubtasks.concat(['dist-sass-css', 'dist-js', 'csslint:dist', 'test-js']);
        testSubtasks = testSubtasks.concat(['dist-sass-css', 'dist-js', 'test-js']);
    }

    grunt.registerTask('test', testSubtasks);
    grunt.registerTask('test-js', ['jshint:core', 'jscs:core']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['uglify:core']);

    // CSS distribution task.
    // grunt.registerTask('less-test', ['lesslint']);
    // grunt.registerTask('less-compile', ['less:compileCore']);
    // grunt.registerTask('dist-less-css', ['less-test', 'less-compile', 'cssmin:minifyCore']);
    grunt.registerTask('sass-test', ['sasslint']);
    grunt.registerTask('sass-compile', ['sass:compileCore']);
    grunt.registerTask('dist-sass-css', ['sass-compile', 'sass-test', 'postcss', 'cssmin:minifyCore']);

    // Default task.
    grunt.registerTask('default', ['clean:css', 'clean:js', 'test']);

    grunt.registerTask('image', ['resize_crop:image_group','imagemagick-resize','imagemin:dynamic']);

};