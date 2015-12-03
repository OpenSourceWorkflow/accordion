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
        Accordion._setupAccordion();
        Accordion._openAccordionViaClass();
        Accordion._openAccordionViaHash();
      });
    },

    /**
     * Setup HTML and trigger custom events.
     * @function _setupAccordion
     * @private
     */
    _setupAccordion: function() {

      // set html attributes
      this.$accordion.attr('role', 'tablist');
      this.$accordion_content.attr('aria-expanded', 'false').attr('role', 'tabpanel').hide();
      this.$accordion_header.attr('role', 'tab').attr('tabindex', '0').attr('aria-selected', 'false');

      // set up each accordion
      this.$accordion.each(function(index) {
        var $this = $(this);

        if(!$this.data('name')) {

          // save state
          $this.data('name', 'accordion');

          // setup
          Accordion._addARIAlabels($this, index);
          Accordion._bindEvents($this);

          // publish event with current accordion
          $this.trigger('accordion.initialized', $this);

        }
      });
    },

    /**
     * Initialize the accordion.
     * @function destroy
     * @public
     */
    destroy: function() {

      Accordion.$accordion.removeAttr('role');
      Accordion.$accordion.data('name', null);

      Accordion.$accordion_header.removeAttr('id');
      Accordion.$accordion_header.removeAttr('role');
      Accordion.$accordion_header.removeAttr('tabindex');
      Accordion.$accordion_header.removeAttr('aria-selected');
      Accordion.$accordion_header.removeAttr('aria-controls');
      Accordion.$accordion_header.removeClass('accordion-active');

      Accordion.$accordion_content.removeAttr('aria-expanded');
      Accordion.$accordion_content.removeAttr('role');
      Accordion.$accordion_content.removeAttr('aria-hidden');
      Accordion.$accordion_content.removeAttr('aria-labelledby');
      Accordion.$accordion_content.removeAttr('style');
      Accordion.$accordion_content.removeAttr('id');
      Accordion.$accordion_content.removeClass('accordion-opened');

      Accordion.$accordion_header.off('click keydown');

    },

    /**
     * Bind events to all interactive elements.
     * @function _bindEvents
     * @param {Object} accordion - Current accordion from setup loop.
     * @private
     */
    _bindEvents: function(accordion) {

      // Click accordion header
      accordion.find('.accordion-header').on('click', function(event) {
        event.preventDefault();
        Accordion._closeAll($(this));
        Accordion._toggleAccordion($(this));
      });

      // tab to accordion header and press space bar
      accordion.find('.accordion-header').on('keydown', function(event) {
        if (event.keyCode === 32) {
          event.preventDefault();
          Accordion._toggleAccordion($(this));
        }
      });

    },

    /**
     * Extend defaults with customized options.
     * @function _setOptions
     * @param {Object} options - .
     * @private
     */
    _setOptions: function(options) {
      // extend DEFAULTS with given options
      this.options = $.extend({}, Accordion.DEFAULTS, options);
    },

    /**
     * Add ARIA labels to each accordion.
     * @function _addARIAlabels
     * @param {Object} accordion - jQuery object with current accordion from setup loop.
     * @param {Object} index - index from setup loop.
     * @private
     */
    _addARIAlabels: function(accordion, index) {

      var
      $accordion_header = accordion.find('.accordion-header').attr('id', 'accordion-' + index),
      $accordion_content = accordion.find('.accordion-content').attr('id', 'accordion-' + index);

      $accordion_header.each(function (index){

        var that = $(this);

        // set IDs
        that
          .attr('id', that.attr('id') + '-header-' + index)
          .next()
          .attr('id', that.next().attr('id') + '-content-' + index);

        // set aria-controls
        that.attr('aria-controls', that.next().attr('id'));
      });

      $accordion_content.each(function() {
        var that = $(this);

        // set aria-labelledby
        that.attr('aria-labelledby', that.prev().attr('id'));
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

      // trigger event before the accordion opens
      accordion_header.trigger('accordion.beforeOpen', [accordion_header, accordion_content]);

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

      // trigger event before the accordion closes
      accordion_header.trigger('accordion.beforeClose', [accordion_header, accordion_content]);


      // accordion-header
      accordion_header.attr('aria-selected', 'false').removeClass('accordion-active');

      // accordion-content
      accordion_content.attr('aria-expanded', 'false').attr('aria-hidden', 'true');

      accordion_content.slideUp(Accordion.options.animationSpeed, function() {
        accordion_header.trigger('accordion.closed', [accordion_header, accordion_content]);
      });

    },

    /**
     * Toggle the accordion entry.
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
     * If a hash is provided that matches the accordion header's ID this entry is opened.
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
