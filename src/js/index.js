const toggleClass = require('./_helpers/_h-toggle-class.js');

try {
  require('./_modules/_m-setup.js');
  toggleClass();
  console.log('JS loaded!');
} catch (err) {
  console.trace(err);
}

setTimeout(function () {
  var b = document.body;
  b.classList.add('loaded');
}, 150);
