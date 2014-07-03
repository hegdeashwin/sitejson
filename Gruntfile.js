module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            all: ["lib/**/*.js", "bin/**/*.js"],
            options: {
                ignores: ["src/libs/**/*.js"],
                jshintrc: 'config/.jshintrc'
            }
        },
        jscs: {
            src: ["src/js/**/*.js", "bin/**/*.js"],
            options: {
                config: "config/.jscsrc"
            }
        }
    });

    /**
     * Load tasks
     */
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs-checker");

    /**
     * Define tasks : Tasks for development eco - system.
     */
    grunt.registerTask("default", [
        "jshint",
        "jscs"
    ]);

    grunt.registerTask('dev', ['default']); // Alias for `default`.
};