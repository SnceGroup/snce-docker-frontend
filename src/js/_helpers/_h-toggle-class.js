module.exports = function () {

  var _triggers = document.querySelectorAll('[data-trigger]');

  function _searchElements() {
    [].forEach.call(_triggers, function (el, i) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var target = this.getAttribute('data-target'),
          changeClass = this.getAttribute('data-class');

        if (target === 'this') {
          this.classList.toggle(changeClass);
        } else {
          var elm = _closest(el, target);
          elm.classList.toggle(changeClass);
        }
      });
    });
  }

  function _closest(e, classname) {
    if (e.classList.contains(classname)) {
      return e;
    }
    if (e.parentNode.nodeName !== 'BODY')
      return e.parentNode && _closest(e.parentNode, classname);
    return false;
  }

  _searchElements();
};

