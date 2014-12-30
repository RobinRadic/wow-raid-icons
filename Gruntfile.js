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
            dist: 'dist'
        },
        copy: {
            html: {
                src: 'src/index.html',
                dest: 'dist/index.html'
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
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html']
            },
            styles: {
                files: ['src/styles/**'],
                tasks: ['sass:build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/**/*'
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
                    open: true
                },
                dist: {
                    options: {
                        open: true,
                        base: 'dist'
                    }
                }
            }
        },
        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['**/*.scss'],
                    dest: 'dist/',
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
        }


    });

  //  grunt.loadTasks('src/tasks/makeimg/tasks');

    grunt.registerTask('build', ['clean:dist', 'copy:html', 'sass:build'])
};
