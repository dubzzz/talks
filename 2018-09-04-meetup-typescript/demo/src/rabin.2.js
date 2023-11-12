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
  const toNum = function toNum(character) {
    const surrogate = character.codePointAt(1);
    return (
      (surrogate === undefined ? 0 : surrogate) |
      (character.codePointAt(0) << 16)
    );
  };
  const arrEq = (a1, a2) =>
    a1.length === a2.length && a1.every((val, idx) => val === a2[idx]);

  const wordArr = [...word].map(toNum);
  const textArr = [...text].map(toNum);

  // The prime generation function could depend on the inputs for collision guarantees.
  const hasher = new RabinFingerprint(() => 229);
  const cmpVal = hasher.init(wordArr);

  let currHash = hasher.init(textArr.slice(0, wordArr.length));
  if (currHash === cmpVal && arrEq(wordArr, textArr.slice(0, wordArr.length))) {
    return 0;
  }

  for (let i = 0; i < textArr.length - wordArr.length; i += 1) {
    currHash = hasher.roll(textArr[i], textArr[i + wordArr.length]);
    if (
      currHash === cmpVal &&
      arrEq(wordArr, textArr.slice(i + 1, i + wordArr.length + 1))
    ) {
      return i + 1;
    }
  }

  return -1;
};
