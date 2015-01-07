requirejs.config({

  'appdir': './',
  'baseUrl': './',

  'paths': {
    'jquery.exists': 'bower_components/jquery.exists/jquery.exists',
    'jquery': 'bower_components/jquery/dist/jquery.min'
  },

  'shim': {
    'jquery.exists': ['jquery']
  }

});

requirejs(['accordion'], function(Accordion) {
  Accordion.init({
    animationSpeed: 100,
    naturalBehavior: true
  });
});
