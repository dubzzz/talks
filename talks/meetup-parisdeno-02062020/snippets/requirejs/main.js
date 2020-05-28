requirejs(['a', 'b', 'c'], function (a, b, c) {
  console.log('main', c.read());
});
