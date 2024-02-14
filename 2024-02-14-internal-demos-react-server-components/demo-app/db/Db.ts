'use server';

let counterDb = 0;

async function slowDown() {
  return new Promise((r) => setTimeout(r, 3_000));
}

export async function findCounter() {
  await slowDown();
  return counterDb;
}

export async function findUser() {
  await slowDown();
  await slowDown();
  return { name: 'Nicolas' };
}

export async function saveCounter(counter: number) {
  await slowDown();
  counterDb = counter;
}
