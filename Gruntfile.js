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
    concat: {
      options: {
        separator: ';'
      },
      basic: {
        src: [
          'vendor/*.js','src/utils.js',
          'src/api/*.js', 'src/cache/*.js', 'src/configuration.js', 'src/logger.js',
          'src/tokens/data.js', 'src/tokens/method.js', 'src/tokens/piped.js',
          'src/rules_engine/*.js', 'src/tokenizers/**/*.js', 'src/decorators/*.js',
          'src/application.js', 'src/source.js', 'src/api_client.js',
          'src/translation_key.js', 'src/translation.js', 'src/translator.js',
          'src/language.js', 'src/language_case.js', 'src/language_case_rule.js',
          'src/language_context.js', 'src/language_context_rule.js',
          'src/tr8n.js'
        ],
        dest: 'lib/<%= pkg.name %>.js'
      },
      express: {
        src: [
            'vendor/*.js', 'src/utils.js',
            'src/api/*.js', 'src/cache/*.js', 'src/configuration.js', 'src/logger.js',
            'src/tokens/data.js', 'src/tokens/method.js', 'src/tokens/piped.js',
            'src/rules_engine/*.js', 'src/tokenizers/**/*.js', 'src/decorators/*.js',
            'src/application.js', 'src/source.js', 'src/api_client.js',
            'src/translation_key.js', 'src/translation.js', 'src/translator.js',
            'src/language.js', 'src/language_case.js', 'src/language_case_rule.js',
            'src/language_context.js', 'src/language_context_rule.js',
            'src/extensions/express.js'
        ],
        dest: 'lib/<%= pkg.name %>.express.js'
      },
      helpers: {
        src: [
          'src/helpers/*.js'
        ],
        dest: 'lib/<%= pkg.name %>.helpers.js'
      }
    },
    comments: {
      your_target: {
        options: {
          singleline: true,
          multiline: true
        },
        src: [ 'lib/<%= pkg.name %>.js']
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
      files: ['Gruntfile.js', 'lib/<%= pkg.name %>.js'],
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
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'lib/<%= pkg.name %>.min.js': ['<%= concat.basic.dest %>'],
          'lib/<%= pkg.name %>.express.min.js': ['<%= concat.express.dest %>']
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-stripcomments');

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-blanket');
  grunt.loadNpmTasks('grunt-jsdoc');

//  grunt.registerTask('test', ['jshint', 'mocha']);

  grunt.registerTask('test', ['blanket', 'copy', 'mochaTest']);
  grunt.registerTask('doc', ['jsdoc']);
  // Default task(s).
  //grunt.registerTask('default', ['concat', 'uglify']);

};