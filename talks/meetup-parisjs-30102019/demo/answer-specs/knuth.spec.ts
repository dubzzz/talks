import * as fc from "fast-check";
import { knuth } from "../src/knuth";

test("Some units", () => {
  expect(knuth("a", "a")).toBe(0);
  expect(knuth("abcbcglx", "abca")).toBe(-1);
  expect(knuth("abcbcglx", "bcgl")).toBe(3);
  expect(knuth("abcxabcdabxabcdabcdabcy", "abcdabcy")).toBe(15);
  expect(knuth("abcxabcdabxabcdabcdabcy", "abcdabca")).toBe(-1);
  expect(knuth("abcxabcdabxaabcdabcabcdabcdabcy", "abcdabca")).toBe(12);
  expect(knuth("abcxabcdabxaabaabaaaabcdabcdabcy", "aabaabaaa")).toBe(11);
});

test("should detect the substring", () =>
  fc.assert(
    fc.property(
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      (a, b, c) => knuth(a + b + c, b) !== -1
    )
  ));

test("should send back a valid start", () =>
  fc.assert(
    fc.property(fc.fullUnicodeString(), fc.fullUnicodeString(), (a, b) => {
      const idx = knuth(a, b);
      return idx === -1 || a.substr(idx, b.length) === b;
    })
  ));
