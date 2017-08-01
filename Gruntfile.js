module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-blanket');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      coverage: {
        src: ['coverage/']
      }
    },

    copy: {
      coverage: {
        expand: true,
        cwd: 'test/',
        src: ['**'],
        dest: 'coverage/test'
      },
      config: {
        expand: true,
        cwd: 'config/',
        src: ['**'],
        dest: 'coverage/config'
      }
    },

    blanket: {
      coverage: {
        src: ['lib/'],
        dest: 'coverage/lib/'
      }      
    },

    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
          timeout: 10000
        },
        src: ['coverage/test/**/*.js']
      },
      'mocha-lcov-reporter': {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'coverage/lcov.info'
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

    mocha_istanbul: {
      coverage: {
        src: 'test', // a folder works nicely
        options: {
          mask: './**/*.js'
        }
      }
      // coveralls: {
      //   src: ['test', 'testSpecial', 'testUnique'], // multiple folders also works
      //   options: {
      //     coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
      //     check: {
      //       lines: 75,
      //       statements: 75
      //     },
      //     root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
      //     reportFormats: ['cobertura','lcovonly']
      //   }
      // }
    },
    // istanbul_check_coverage: {
    //   default: {
    //     options: {
    //       coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
    //       check: {
    //         lines: 80,
    //         statements: 80
    //       }
    //     }
    //   }
    // },

    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js'],
      options: {
        curly:    false,
        eqeqeq:   false,
        undef:    false,
        immed:    false,
        latedef:  false,
        newcap:   false,
        noarg:    false,
        sub:      false,
        unused:   false,
        boss:     true,
        eqnull:   true,
        node:     true,
        globals: {
          jQuery:   true,
          console:  true,
          module:   true,
          document: true
        }
      }
    },

    jsdoc : {
      dist : {
        src: ['lib/**/**/**/*.js'],
        options: {
          destination: 'docs'
        }
      }
    },

    watch: {
      all: {
        files: ['lib/**/**/*.js', 'test/**/**/*.js'],
        tasks: ['coverage']
      }
    },

    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'coverage/lcov.info'
      }
    }
  });

  grunt.registerTask('test', ['clean', 'jshint', 'blanket', 'copy', 'mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('docs', ['jsdoc']);
  grunt.registerTask('build', ['test']);
  grunt.registerTask('default', ['test']);
};
