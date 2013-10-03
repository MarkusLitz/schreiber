module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
        options: {
            separator: ';\n'
        },
        dist: {
            files: {
                'dist/app.js': [
                    // codemirror
                    'bower_components/codemirror/lib/codemirror.js',
                    'bower_components/codemirror/addon/edit/continuelist.js',
                    'bower_components/codemirror/addon/mode/overlay.js',
                    'bower_components/codemirror/mode/xml/xml.js',
                    'bower_components/codemirror/mode/javascript/javascript.js',
                    'bower_components/codemirror/mode/css/css.js',
                    'bower_components/codemirror/mode/php/php.js',
                    'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
                    'bower_components/codemirror/mode/markdown/markdown.js',
                    'bower_components/codemirror/mode/gfm/gfm.js',
                    // mousetrap
                    'bower_components/mousetrap/mousetrap.js',
                    'bower_components/mousetrap/plugins/global-bind/mousetrap-global-bind.js',
                    // marked
                    'bower_components/marked/lib/marked.js',
                    // app
                    'js/preview.js', 
                    'js/file.js', 
                    'js/fileBrowser.js', 
                    'js/app.js', 
                     // boot
                    'js/boot.js'
                ],
                'dist/chromeapp.js' : [
                    'dist/app.js',
                    'js/window-controls.js',
                    'js/chromeapp.js',
                    'bower_components/chrome-app-samples/gapi-chrome-apps-lib/gapi-chrome-apps.js'
                ],
                'dist/background.js' : [
                    'js/background.js',
                ],
                'dist/webapp.js': [
                    'dist/app.js',
                    'js/webapp.js',
                    'bower_components/chrome-app-samples/gapi-chrome-apps-lib/gapi-chrome-apps.js'
                ]
            }
        }
    },
    less: {
        dist: {
            options: {
                paths: ["less", "vendor"],
                //strictImports: true
            },
            files: {
                "dist/app.css": "less/app.less"
            }
        }
    },
    copy: {
        dist: {
            files: [
                {   
                    src: ['vendor/linecons/fonts/*'], 
                    dest: 'dist/fonts', 
                    filter: 'isFile', 
                    expand: true, 
                    flatten: true
                }
            ]
        }
    },

    jade: {
        dist: {
            options: {
                data: {
                    debug: false
                }
            },
            files: {
                "dist/webapp.html": ["jade/webapp.jade"],
                "dist/chromeapp.html": ["jade/chromeapp.jade"]
            }
        }
    },

    watch: {
        gruntfile: {
            files: ['package.json', 'gruntfile.js'],
            tasks: ['bower', 'default']
        },
        css: {
            files: 'less/*.less',
            tasks: ['less'],
            options: {
                //livereload: false,
            },
        },

        js: {
            files: 'js/*.js',
            tasks: ['concat']
        },

        jade: {
            files: 'jade/*',
            tasks: ['jade']
        }
    },

    bower: {
        install: {
            options: {
                copy: false,
                //targetDir: './vendor/bower',
                //layout: 'byType',
                //install: true,
                //verbose: false,
                //cleanTargetDir: false,
                //cleanBowerDir: flase
            }
        }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('init', ['bower']);
  grunt.registerTask('default', ['bower', 'concat', 'less', 'copy', 'jade']);
};