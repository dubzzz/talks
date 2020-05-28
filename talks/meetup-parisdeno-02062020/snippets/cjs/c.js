console.log('c');

let value = 0;

exports.read = () => {
  console.log('read');
  return value;
};

exports.inc = () => {
  console.log('inc');
  ++value;
};
