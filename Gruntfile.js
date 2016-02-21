module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dot: true,
        clean: {
            sass: ["files/to/clean", "other/files/to/clean"]
        },
        watch: {
            sass: {
                files: ['**/*.scss', '**/**/*.scss'],
                tasks: ['re-sass'],
                options: {
                    interrupt: true
                },
            }
        },
        sass: {
            dist: {
                files: {
                    'path/to.css': 'path/to.scss',
                }
            }
        },
        unused: {
            options: {
                reference: grunt.option('ref'),
                directory: ['**/*.html'],
                remove: false // set to true to delete unused files from project
            }
        },
        uncss: {
            dist: {
                files: {
                    'css/base-tidy.css': ['index.html']
                }
            }
        }
    });

    //EVENTS
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    //LOAD TASKS

    //Wipes the opted folder clean of files
    grunt.loadNpmTasks("grunt-contrib-clean");

    //Watch for changes
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Compile sass
    grunt.loadNpmTasks('grunt-contrib-sass');

    //Checks for unused files
    grunt.loadNpmTasks('grunt-unused');

    //Cleans up unused css
    grunt.loadNpmTasks('grunt-uncss');

    //REGISTER TASKS

    //Default - command: grunt default
    grunt.registerTask(
        "default",
        "Watch and reload sass files.", ["clean", "sass", "watch"]
    );

    grunt.registerTask(
        "re-sass",
        "Clean old css and re-compile sass.", ["clean", "sass"]
    );
};