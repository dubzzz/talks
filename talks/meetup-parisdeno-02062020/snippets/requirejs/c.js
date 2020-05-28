requirejs([], function () {
  console.log('c');
  let value = 0;
  return {
    read() {
      console.log('read');
      return value;
    },
    inc() {
      console.log('inc');
      ++value;
    },
  };
});
