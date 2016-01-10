module.exports = function(grunt) {
    var mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        uglify: {
            vendor: {
                files: {
                    'js/pm_ui_kit.min.js': ['vendor/js/*.js']
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/pm_ui_kit.css": "vendor/less/pm_ui_kit.less"
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-resize-crop');
    grunt.loadNpmTasks('grunt-imagemagick');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['uglify','less','cssmin']);
    grunt.registerTask('image', ['resize_crop:image_group','imagemagick-resize','imagemin:dynamic']);

};