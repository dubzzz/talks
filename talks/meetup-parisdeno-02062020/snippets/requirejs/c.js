define([], function () {
  console.log('c');
  let value = 0;
  return {
    read: function () {
      console.log('read');
      return value;
    },
    inc: function () {
      console.log('inc');
      ++value;
    },
  };
});
