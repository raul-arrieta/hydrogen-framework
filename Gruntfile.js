module.exports = function(grunt) {

    var config = {

        pkg: grunt.file.readJSON("package.json"),

        clean: {
            demo: ["demo/lib"],
            dist: ["dist"]
        },

        copy: {
            source: { expand: true, cwd: "source/js", src: ["**/*.js"], dest: "demo/lib/js" },
            components: { expand: true, cwd: "bower_components/jquery/dist", src: ["*.min.js"], dest: "demo/lib/js" }
        },
        concat: {
            options: { separator: ";" },
            dist: { src: ["source/js/hydrogen*.js"], dest: "dist/hydrogen.min.js" },
        },
        less: {
            source: {
                options: { compress: true, yuicompress: true, optimization: 2 },
                files: {
                    // Take the file hydrogen.less and compile it into hydrogen.min.css
                    "demo/lib/css/hydrogen.min.css": "source/styles/hydrogen.less"
                }
            },
            dist: {
                options: { compress: true, yuicompress: true, optimization: 2 },
                files: { "dist/hydrogen.min.css": "source/styles/hydrogen.less" }
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
        watch: {
            source: {
                files: ["source/**/*.*"],
                tasks: ["jshint", "clean:demo", "copy:source", "copy:components", "less:source"],
                options: {
                    spawn: false,
                },
            },
        },
        "http-server": {
            dev: {

                // the server root directory
                root: "demo",

                port: 8282,

                host: "127.0.0.1",

                cache: false,
                showDir : true,
                autoIndex: true,
                defaultExt: "html",

                // run in parallel with other tasks
                runInBackground: true
            }
        }
    };

    grunt.loadNpmTasks("grunt-http-server");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.initConfig(config);

    grunt.registerTask("default", [
        "jshint",
        "clean:demo",
        "copy:source",
        "copy:components",
        "less:source",
        "http-server:dev",
        "watch:source"
    ]);

    grunt.registerTask("distrib", [
        "jshint",
        "clean:dist",
        "concat:dist",
        "less:dist"
    ]);

};
