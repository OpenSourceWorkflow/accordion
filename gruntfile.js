module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      options: {
        livereload: true,
        spawn: false
      },

      scss: {
        files: '**/*.scss',
        tasks: ['compass:development']
      },

      js: {
        files: '**/*.js',
        tasks: [],
      },

      html: {
        files: '**/*.html',
        tasks: [],
      }
    },

    compass: {
      options: {
        // httpPath: "/",
        banner: "/* <%= pkg.author %>, Version: <%= pkg.version %> */",
        cssDir: 'css',
        imagesDir: 'img',
        noLineComments: false,
        sassDir: 'scss',
        specify: "scss/*.scss"
      },
      development: {
        options: {
          environment: 'development'
        }
      },
      production: {
        options: {
          environment: 'production'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass:development']);
  grunt.registerTask('production', ['compass:production']);

};
