console.log('c');

let value = 0;

export const read = () => {
  console.log('read');
  return value;
};

export const inc = () => {
  console.log('inc');
  ++value;
};
