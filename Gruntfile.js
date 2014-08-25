module.exports = function(grunt) {

    var config = {

        pkg: grunt.file.readJSON("package.json"),

        clean: {
            demo: ["demo/lib"]
        },

        copy: {
            source:{

                expand: true,
                cwd: "source/js",
                src: [
                        "**/*.js",
                    ],
                dest: "demo/lib/js"
            }
        },

        less: {
            source: {
                options: {
                    // Compression configuration (spaces removed, comments removed,...)
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // Take the file hydrogen.less and compile it into hydrogen.min.css
                    "demo/lib/css/hydrogen.min.css": "source/styles/hydrogen.less"
                }
            }
        },
        jshint: {
            source: {
                // Validate source code against the jshintrc file"s rules
                src: [
                    "source/**/*.js",
                    "Gruntfile.js",
                    "package.json"
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        "http-server": {
            dev: {

                // the server root directory
                root: "demo",

                port: 8282,

                host: "127.0.0.1",

                cache: 0,
                showDir : true,
                autoIndex: true,
                defaultExt: "html",

                // run in parallel with other tasks
                runInBackground: false
            }
        }
    };

    grunt.loadNpmTasks("grunt-http-server");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.initConfig(config);

    grunt.registerTask("default", [
        "jshint",
        "clean:demo",
        "copy:source",
        "less:source",
        "http-server:dev"
    ]);

};
