module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dot: true,
        copy: {
            build: {
                cwd: "app",
                src: ["**"],
                dest: "build",
                expand: true
            },
            release: {
                cwd: "build",
                app: ["**"],
                dest: "release",
                expand: true
            },
            root: {
                cwd: "",
                src: ["**"],
                dest: "../../",
                expand: true
            }
        },
        clean: {
            build: {
                src: ["build"]
            },
            scripts: {
                src: ["build/js/*.js", "!build/js/main.min.js"]
                //You can add multiple ignore files
                //"build/*.js", "!build/NodeMaker-min.js", "!build/Files.js"
            },
            sass: {
                src: ["build/css/*.scss"]
            },
            bower: {
                src: ["bower_components", "bower.json", "README.md"]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: {
                    "build/js/main.min.js": ["build/js/main.js"]
                }
            }
        },
        watch: {
            build: {
                files: ["app/**"],
                tasks: ["build"],
                options: { livereload: true }
            },
            specs: {
                files: ["spec/**"],
                tasks: ["jasmine"],
                options: { livereload: true }
            }
        },
        connect: {
            //Use if you don't already have a localhost setup
            server: {
                options: {
                    keepalive: true,
                    open: true,
                    port: 9999,
                    base: 'www-root',
                    middleware: function() {
                        var middleware = [];
                        //Example
                        /*middleware.push(function(req, res, next) {
                            if (req.url !== "/") return next();

                            res.setHeader("Content-type", "text/html");
                            var html = grunt.file.read("app/header.html");
                            html += grunt.file.read("app/menu.html");

                            var files = grunt.file.expand("app/sections/*.html");

                            for (var i = 0; i < files.length; i++) {
                                html += grunt.file.read(files[i]);
                            }

                            html += grunt.file.read("app/footer.html");
                            res.end(html);
                        });*/
                        return middleware;
                    }
                }
            }
        },
        jasmine: {
            pivotal: {
                src: "path-to-file",
                options: {
                    specs: "path-to-specs",
                    outfile: "SpecRunner.html",
                    keepRunner: true
                }
            }
        },
        notify: {
            reload: {
                options: {
                    title: 'Live Reload',
                    message: 'Changes made'
                }
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'build/css/main.css': 'app/css/main.scss'
                }
            }
        },
        open : {
            dev : {
                path: 'http://localhost/spektral-cms/build/',
                app: 'Google Chrome'
            }
        },
        htmlbuild: {
            dist: {
                src: 'build/index.html',
                dest: 'release/',
                options: {
                    beautify: true
                }
            }
        }
    });

    //EVENTS
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    //LOAD TASKS
    //Copies files from source folder to build folder - command: grunt copy
    grunt.loadNpmTasks("grunt-contrib-copy");
    //Wipes the build folder clean of files - command: grunt clean
    grunt.loadNpmTasks("grunt-contrib-clean");
    //Minifies files - command: grunt uglify
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //Watch files for changes - command: grunt watch
    grunt.loadNpmTasks("grunt-contrib-watch");
    //Development server - command: grunt connect
    grunt.loadNpmTasks("grunt-contrib-connect");
    //Unit testing framework
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //Sass compiler
    grunt.loadNpmTasks('grunt-contrib-sass');
    //Desktop notifier
    grunt.loadNpmTasks('grunt-notify');
    //Open
    grunt.loadNpmTasks('grunt-open');
    //HTML build
    grunt.loadNpmTasks('grunt-html-build');

    //REGISTER TASKS

    //Jasmine
    grunt.registerTask("test", ["jasmine"]);

    //Scripts
    grunt.registerTask(
        "scripts",
        "Uglifies and copies the Javascript files.",
        ["uglify", "clean:scripts"]
    );

    //Sass
    grunt.registerTask(
        "compass",
        "Compiles sass file to css.",
        ["sass", "clean:sass"]
    );

    //Build
    grunt.registerTask(
        "build-and-test",
        "Compiles all of the assets and copies the files to the build directory.",
        ["clean:build", "copy:build", "scripts", "compass", "jasmine"]
    );

    //Build and Test
    grunt.registerTask(
        "build",
        "Compiles all of the assets and copies the files to the build directory.",
        ["clean:build", "copy:build", "scripts", "compass"]
    );

    //Build and release
    grunt.registerTask(
        "build-release",
        "Build the project and then creates a release version.",
        ["build", "release"]
    );

    //Release
    grunt.registerTask(
        "release",
        "Copies all files from build directory and removes any development related code, to make the files ready for release.",
        ["copy:release", "htmlbuild"]
    );

    //Default - command: grunt default
    grunt.registerTask(
        "default",
        "Watches the project for changes, automatically builds them and runs a server.",
        ["build", "open", "watch"]
    );
};