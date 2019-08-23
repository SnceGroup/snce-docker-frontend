var isSafari = (function () {
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && window.innerWidth < 768) {
    document.body.classList.add('isSafari');
    return true;
  }
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
})();

module.exports = isSafari;