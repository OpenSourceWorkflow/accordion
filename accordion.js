define(['jquery', 'jquery.exists'], function() {

  'use strict';

  /************************************************************
    @author mail@markus-falk.com
    @description Simple Accordion Script that allows for
    multiple tabs to be open. Sets ARIA-roles as well.
    @requires jQuery 1.7+
  *************************************************************/

  var Accordion = {
    DEFAULTS: {
      animationSpeed: 300
    },
    cacheElements: function() {
      this.$accordion = $('.accordion');
      this.$accordion_content = $('.accordion-content');
      this.$accordion_header = $('.accordion-header');
    },
    init: function() {
      Accordion.cacheElements();

      this.$accordion.exists(function() {
        Accordion.addARIAlabels();
        Accordion.setupAccordion();
        Accordion.bindEvents();
      });
    },
    setupAccordion: function() {
      this.$accordion.attr('role', 'tablist');
      this.$accordion_content.attr('aria-expanded', 'false').attr('role', 'tabpanel').hide();
      this.$accordion_header.attr('role', 'tab').attr('tabindex', '0').attr('aria-selected', 'false');

      this.$accordion.each(function() {
        $(this).trigger('accordion.initialized');
      });
    },
    bindEvents: function() {
      // Click accordion header
      this.$accordion_header.on('click', function(event) {
        event.preventDefault();
        Accordion.toggleAccordion($(this));
      });

       // tab to accordion header and press space bar
      this.$accordion_header.on('keydown', function(event) {
        if (event.keyCode === 32) {
          event.preventDefault();
          Accordion.toggleAccordion($(this));
        }
      });
    },
    addARIAlabels: function() {
      this.$accordion.each(function(index) {

        var
        that = $(this),
        $accordion_header = that.find('.accordion-header').attr('id', 'accordion-' + index),
        $accordion_content = that.find('.accordion-content').attr('id', 'accordion-' + index);

        $accordion_header.each(function (index){

          var that = $(this);

          // set IDs
          that
            .attr('id', that.attr('id') + '-header-' + index)
            .next()
            .attr('id', that.next().attr('id') + '-content-' + index);

          // set aria-controls
          that
            .attr('aria-controls', that.next().attr('id'));
        });

        $accordion_content.each(function() {
          var that = $(this);

          // set aria-labelledby
          that
            .attr('aria-labelledby', that.prev().attr('id'));
        });

      });
    },
    toggleAccordion: function(accordion_header) {

      var
      accordion_content = accordion_header.next();

      if (accordion_header.attr('aria-selected') === 'false') {
        // open

        // accordion-header
        accordion_header.attr('aria-selected', 'true').addClass('accordion-active');

        // accordion-content
        accordion_content.attr('aria-expanded', 'true').attr('aria-hidden', 'false');

        accordion_content.slideDown(Accordion.DEFAULTS.animationSpeed, function() {
          accordion_header.trigger('accordion.opened', [accordion_header, accordion_content]);
        });

      } else {
        // close

        // accordion-header
        accordion_header.attr('aria-selected', 'false').removeClass('accordion-active');

        // accordion-content
        accordion_content.attr('aria-expanded', 'false').attr('aria-hidden', 'true');

        accordion_content.slideUp(Accordion.DEFAULTS.animationSpeed, function() {
          accordion_header.trigger('accordion.closed', [accordion_header, accordion_content]);
        });

      }
    }
  };

  Accordion.init();

});
