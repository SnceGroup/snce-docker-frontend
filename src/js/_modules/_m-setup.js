var isIE = require('../_helpers/_h-isie');
var isTouch = require('../_helpers/_h-isTouch.js');

var setup = (function () {

  'use strict';

  var addHTMLClasses = function () {

    var htmlEl = document.documentElement;

    if (isTouch) {
      htmlEl.classList.add('touch');
    } else {
      htmlEl.classList.add('no-touch');
    }

    if (isIE) {
      htmlEl.classList.add('ie');
    } else {
      htmlEl.classList.add('not-ie');
    }
  };

  var init = function () {
    addHTMLClasses();
  };

  init();

})();
module.exports = setup;