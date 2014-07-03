accordion
=========

Simple Accordion Script (AMD, Bower).

* multiple tabs can be opened and closed independently
* multiple accordions can be used on the same page
* supports ARIA-roles
* falls back to simple heading > content hierarchy
* requires jQuery 1.7+

Setup
-----

```html
<div class="accordion">
  <h2 class="accordion-header">Accordion Header</h2>
  <div class="accordion-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div> <!-- accordion-content -->
  <h2 class="accordion-header">Accordion Header</h2>
  <div class="accordion-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div> <!-- accordion-content -->
</div> <!-- accordion -->
```

Events
------

```javascript
'accordion.opened' // passes .accordion-header, .accordion-content
'accordion.closed' // passes .accordion-header, .accordion-content
'accordion.initialized' // passes .accordion
```

Installation
------------

```shell
bower install markusfalk/accordion
```
