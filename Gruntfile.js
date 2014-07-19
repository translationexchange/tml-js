module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      coverage: {
        src: ['coverage/']
      }
    },
    copy: {
      coverage: {
        src: ['test/**'],
        dest: 'coverage/'
      }
    },
    blanket: {
      coverage: {
        src: ['lib/'],
        dest: 'coverage/lib/'
      }
    },
    comments: {
      your_target: {
        options: {
          singleline: true,
          multiline: true
        },
        src: [ 'dist/<%= pkg.name %>.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
//        src: ['test/**/*.js']
        src: ['coverage/test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['coverage/test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['coverage/test/**/*.js']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    browserify: {
      dist: {
        src: ['lib/extensions/browser.js'],
        dest: 'dist/<%= pkg.name %>.js',
        options: {
          exclude: ['request']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= browserify.dist.dest %>']
        }
      }
    },
    jsdoc : {
      dist : {
        src: ['src/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },
    watch: {
      all: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['concat', 'comments', 'clean', 'blanket', 'copy', 'mochaTest'] //NOTE the :run flag
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-stripcomments');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-blanket');
  grunt.loadNpmTasks('grunt-jsdoc');

//  grunt.registerTask('test', ['jshint', 'mocha']);

  grunt.registerTask('test', ['blanket', 'copy', 'mochaTest']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('build', ['test','browserify','uglify']);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'test']);

};