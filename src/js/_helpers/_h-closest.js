var _closest = function (e, classname) {
  if (e.classList.contains(classname)) {
    return e;
  }
  if (e.parentNode.nodeName != 'BODY')
    return e.parentNode && _closest(e.parentNode, classname);
  return false;
};

module.exports = _closest;