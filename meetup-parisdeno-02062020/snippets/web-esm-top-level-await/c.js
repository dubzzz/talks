console.log('c');

let value = 42;
await new Promise((resolve) => setTimeout(resolve, 5000));

value = 0;

export const read = () => {
  console.log('read');
  return value;
};

export const inc = () => {
  console.log('inc');
  ++value;
};
