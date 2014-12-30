/*global module:false*/
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: 'dist',
            preview: 'preview/**'
        },
        copy: {
            preview: {
                files: [{
                    expand: true,
                    cwd: 'src/preview',
                    src: '**',
                    dest: 'preview/'
                }, {
                    expand: true,
                    cwd: 'dist',
                    src: '**',
                    dest: 'preview/'
                }, {
                    expand: true,
                    cwd: 'src/images',
                    src: '**',
                    dest: 'preview/images'
                }, {
                    expand: true,
                    cwd: 'lib/vendor/jquery/dist',
                    src: 'jquery.min.*',
                    dest: 'preview/'
                }, {
                    expand: true,
                    cwd: 'src',
                    src: 'wow-raid-icons.scss',
                    dest: 'preview/'
                }]
            }

        },
        cssmin: {
            build: {
                src: 'dist/wow-raid-icons.css',
                dest: 'dist/wow-raid-icons.min.css'
            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            preview: {
                files: ['src/preview/**'],
                tasks: ['build']
            },
            styles: {
                files: ['src/*.scss'],
                tasks: ['sass:build']
            },
            demo: {
                files: ['src/demo.scss'],
                tasks: ['sass:demo']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/**/*',
                    'preview/**'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9009,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: 'preview'
                }
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['wow-raid-icons.scss'],
                    dest: 'dist/',
                    ext: '.css'
                }]
            },
            demo: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['demo.scss'],
                    dest: 'preview/',
                    ext: '.css'
                }]
            }
        },
        image_base64_sass: {
            build: {
                options: {
                    dest: 'src/styles/_imagess.scss'
                },
                files: [{src: 'src/images/raid-icons.jpg'}, {src: 'src/images/heroic.png'}]
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            serve: ['watch', 'connect:livereload:keepalive']
        },
        publisher: {
            bower: {
                enabled: true
            },
            npm: {
                publish: true
            }
        }


    });

    // serve:
    grunt.registerTask('build', ['clean:dist', 'clean:preview', 'sass:build', 'sass:demo', 'copy:preview']);
    grunt.registerTask('serve', ['build', 'concurrent:serve']);
    grunt.registerTask('dist', ['build', 'cssmin']);
};
