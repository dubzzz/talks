class RabinFingerprint {
  constructor(primeGenerator) {
    this.prime = primeGenerator();
  }

  init(values) {
    this.val = 0;
    this.len = values.length;

    for (let i = 0; i < values.length; i += 1) {
      this.val =
        (((this.val * 2) % this.prime) + (values[i] % this.prime)) % this.prime;
    }

    return this.val;
  }

  roll(oldValue, newValue) {
    let oldVal = oldValue % this.prime;
    for (let i = 1; i < this.len; i += 1) {
      oldVal = (oldVal * 2) % this.prime;
    }
    this.val = (this.val + this.prime - (oldVal % this.prime)) % this.prime;

    const newVal = newValue % this.prime;
    this.val =
      (((this.val * 2) % this.prime) + (newVal % this.prime)) % this.prime;

    return this.val;
  }
}

exports.rabin = function rabinKarp(text, word) {
  // The prime generation function could depend on the inputs for collision guarantees.
  const hasher = new RabinFingerprint(() => 229);
  const toCode = character => character.codePointAt(0);
  const cmpVal = hasher.init(Array.from(word).map(toCode));

  let currHash = hasher.init(
    Array.from(text.substring(0, word.length)).map(toCode)
  );
  if (
    currHash === cmpVal &&
    word.valueOf() === text.substring(0, word.length).valueOf()
  ) {
    return 0;
  }

  for (let i = 0; i < text.length - word.length; i += 1) {
    currHash = hasher.roll(
      text.codePointAt(i),
      text.codePointAt(i + word.length)
    );
    if (
      currHash === cmpVal &&
      word.valueOf() === text.substring(i + 1, i + word.length + 1).valueOf()
    ) {
      return i + 1;
    }
  }

  return -1;
};
