define(['jquery', 'libs/jquery/jquery.doitifneeded'], function() {

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
    },
    bindEvents: function() {
      // Click accordion header
      this.$accordion_header.on('click', function(e) {
        Accordion.toggleAccordion($(this));
      });

      // tab to accordion header and press enter key
      this.$accordion_header.on('keydown', function(e) {
        if (e.keyCode === 13) {
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

      if (element.attr('aria-selected') === 'false') {
        element.attr('aria-selected', 'true')
        .next()
        .attr('aria-expanded', 'true')
        .attr('aria-hidden', 'false');
      } else {
        element.attr('aria-selected', 'false')
        .next()
        .attr('aria-expanded', 'false')
        .attr('aria-hidden', 'true');
      }

      element
        .toggleClass('active')
        .next()
        .slideToggle();
    }
  };

  Accordion.init();

});
