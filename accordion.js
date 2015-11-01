define(['jquery', 'jquery.exists'], function($) {

  'use strict';

  /*
   * simple and accessible accordion
   * @author mail@markus-falk.com
   * @requires jQuery 1.7+
   */

  var Accordion = {

    /**
     * Defaults to be extended into options
     */
    DEFAULTS: {
      animationSpeed: 300,
      naturalBehavior: false
    },

    /**
     * Cache jQuery elements.
     * @function _cacheElements
     * @private
     */
    _cacheElements: function() {
      this.$accordion = $('.accordion');
      this.$accordion_content = $('.accordion-content');
      this.$accordion_header = $('.accordion-header');
      this.$accordion_opened = $('.accordion-opened');
    },

    /**
     * Initialize the accordion.
     * @function init
     * @public
     * @param {Object} options - The properties you would like to overwrite.
     */
    init: function(options) {
      Accordion._cacheElements();
      Accordion.$accordion.exists(function() {
        Accordion._setOptions(options);
        Accordion._addARIAlabels();
        Accordion._setupAccordion();
        Accordion._bindEvents();
        Accordion._openAccordionViaClass();
        Accordion._openAccordionViaHash();
      });
    },

    /**
     * Bind events to all interactive elements.
     * @function _bindEvents
     * @private
     */
    _bindEvents: function() {

      // Click accordion header
      this.$accordion_header.on('click', function(event) {
        event.preventDefault();
        Accordion._closeAll($(this));
        Accordion._toggleAccordion($(this));
      });

      // tab to accordion header and press space bar
      this.$accordion_header.on('keydown', function(event) {
        if (event.keyCode === 32) {
          event.preventDefault();
          Accordion._toggleAccordion($(this));
        }
      });
    },

    /**
     * Extend defaults with customized options.
     * @function _setOptions
     * @private
     */
    _setOptions: function(options) {
      // extend DEFAULTS with given options
      this.options = $.extend({}, Accordion.DEFAULTS, options);
    },

    /**
     * Setup HTML and trigger custom events.
     * @function _setupAccordion
     * @private
     */
    _setupAccordion: function() {
      this.$accordion.attr('role', 'tablist');
      this.$accordion_content.attr('aria-expanded', 'false').attr('role', 'tabpanel').hide();
      this.$accordion_header.attr('role', 'tab').attr('tabindex', '0').attr('aria-selected', 'false');

      this.$accordion.each(function() {
        $(this).trigger('accordion.initialized');
      });
    },

    /**
     * Add ARIA labels to each accordion.
     * @function _addARIAlabels
     * @private
     */
    _addARIAlabels: function() {
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

    /**
     * Close all open accordion entries within one accordion for natural behavior.
     * @function _closeAll
     * @private
     * @param {Object} accordion_header - The clicked accordion header.
     */
    _closeAll: function(accordion_header) {

      var opened = accordion_header.closest('.accordion').find('.accordion-active');

      // close opened entry when option is set and the open entry is not the clicked
      if(this.options.naturalBehavior && !opened.is(accordion_header)) {
        this._closeAccordion(opened);
      }
    },

    /**
     * Open a single accordion entry and trigger events.
     * @function _openAccordion
     * @private
     * @param {Object} accordion_header - The clicked accordion header.
     */
    _openAccordion: function(accordion_header) {

      var
      accordion_content = accordion_header.next();

      // accordion-header
      accordion_header.attr('aria-selected', 'true').addClass('accordion-active');

      // accordion-content
      accordion_content.attr('aria-expanded', 'true').attr('aria-hidden', 'false');

      accordion_content.slideDown(Accordion.options.animationSpeed, function() {
        accordion_header.trigger('accordion.opened', [accordion_header, accordion_content]);
      });

    },

    /**
     * Close a single accordion entry and trigger events.
     * @function _closeAccordion
     * @private
     * @param {Object} accordion_header - The clicked accordion header.
     */
    _closeAccordion: function(accordion_header) {

      var
      accordion_content = accordion_header.next();

      // accordion-header
      accordion_header.attr('aria-selected', 'false').removeClass('accordion-active');

      // accordion-content
      accordion_content.attr('aria-expanded', 'false').attr('aria-hidden', 'true');

      accordion_content.slideUp(Accordion.options.animationSpeed, function() {
        accordion_header.trigger('accordion.closed', [accordion_header, accordion_content]);
      });

    },

    /**
     * Returns the sum of arg1 and arg1.
     * @function _toggleAccordion
     * @private
     * @param {Object} accrodion_header - The clicked accordion header.
     */
    _toggleAccordion: function(accordion_header) {

      if (accordion_header.attr('aria-selected') === 'false') {
        // open:
        this._openAccordion(accordion_header);
      } else {
        // close:
        this._closeAccordion(accordion_header);
      }
    },

    /**
     * Open a single accordion entry via a hash in the URL.
     * @function _openAccordionViaHash
     * @private
     * @param {Object} accrodion_header - The clicked accordion header.
     */
    _openAccordionViaHash: function() {
      // find linked accordion content and click
      // corresponding .accordion-header to open it
      if(window.location.hash) {
        $(window.location.hash).prev().trigger('click');
      }
    },

    /**
     * Returns the sum of arg1 and arg1.
     * @function _openAccordionViaClass
     * @private
     */
    _openAccordionViaClass: function() {
      // open accordion content with class
      // 'accordion-opened'
      this.$accordion_opened.exists(function() {
        Accordion.$accordion_opened.each(function() {

          // only open if it is not linked via url window.location.hash
          if(window.location.hash != ('#' + this.id)) {
            $(this).prev().trigger('click');
          }

        });
      });
    }
  };

  return /** @alias module:Accordion */ {
    /** init */
    init: Accordion.init,
    /** destroy */
    destroy: Accordion.destroy
  };

});
