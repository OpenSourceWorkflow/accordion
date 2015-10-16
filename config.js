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
  Accordion.init();

  var accordion_delayed_content = '<div class="accordion"><h2 class="accordion-header">Accordion Header Five (#accordion-2-header-0)</h2><div class="accordion-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> <!-- accordion-content --><h2 class="accordion-header">Accordion Header Six</h2><div class="accordion-content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div> <!-- accordion-content --></div> <!-- accordion -->';

  $('.delayed-accordion').append(accordion_delayed_content);

  Accordion.init();

});
