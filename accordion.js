define(['jquery'], function() {

  'use strict';

  /************************************************************
    @author mail@markus-falk.com
    @description Simple Accordion Script that allows for
    multiple tabs to be open. Sets ARIA-roles as well.
    @requires jQuery 1.7+
  *************************************************************/

  var Accordion = {
    cacheElements: function() {
      this.$accordion = $('.accordion').attr('role', 'tablist');
      this.$accordion_header = $('.accordion-header')
                                .attr('role', 'tab')
                                .attr('tabindex', '0')
                                .attr('aria-selected', 'false');
      this.$accordion_content = $('.accordion-content');
    },
    init: function() {
      this.cacheElements();
      this.addARIAlabels();
      this.bindEvents();

      // hiding tab-content
      this.$accordion_content
        .attr('aria-expanded', 'false')
        .attr('role', 'tab-panel')
        .hide();

      this.$accordion.each(function() {
        $(this).trigger('accordion.initialized');
      });
    },
    bindEvents: function() {
      // Click accordion header
      this.$accordion_header.on('click', function() {
        Accordion.toggleAccordion($(this));
      });

      // tab to accordion header and press enter key
      this.$accordion_header.on('keydown', function(event) {
        if (event.keyCode === 13) {
          Accordion.toggleAccordion($(this));
        }
      });
    },
    addARIAlabels: function() {
      this.$accordion.each(function(index) {

        var $accordion_header = $(this).find('.accordion-header').attr('id', 'accordion-' + index);
        var $accordion_content = $(this).find('.accordion-content').attr('id', 'accordion-' + index);

        $accordion_header.each(function (index){

          // set IDs
          $(this)
            .attr('id', $(this).attr('id') + '-header-' + index)
            .next()
            .attr('id', $(this).next().attr('id') + '-content-' + index);

          // set aria-controls
          $(this)
            .attr('aria-controls', $(this).next().attr('id'));

        });

        $accordion_content.each(function (){
          // set aria-labelledby
          $(this)
            .attr('aria-labelledby', $(this).prev().attr('id'));
        });

      });
    },
    toggleAccordion: function(element) {

      var
      accordion_content = element.next();

      if (element.attr('aria-selected') === 'false') {
        // open

        // accordion-header
        element.attr('aria-selected', 'true');

        // accordion-content
        accordion_content
        .attr('aria-expanded', 'true')
        .attr('aria-hidden', 'false');

        element.trigger('accordion.opened', [element, accordion_content]);

      } else {
        // close

        // accordion-header
        element.attr('aria-selected', 'false');

        // accordion-content
        accordion_content
        .attr('aria-expanded', 'false')
        .attr('aria-hidden', 'true');

        element.trigger('accordion.closed', [element, accordion_content]);

      }

      // * Change active class on link
      // * toggle accordion-content
      element
        .toggleClass('active')
        .next()
        .slideToggle();
    }
  };

  Accordion.init();

});
