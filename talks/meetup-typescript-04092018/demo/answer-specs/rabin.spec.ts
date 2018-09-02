import * as fc from "fast-check";
import { rabin } from "../src/rabin";

test("Some units", () => {
  expect(rabin("", "")).toBe(0);
  expect(rabin("a", "")).toBe(0);
  expect(rabin("a", "a")).toBe(0);
  expect(rabin("abcbcglx", "abca")).toBe(-1);
  expect(rabin("abcbcglx", "bcgl")).toBe(3);
  expect(rabin("abcxabcdabxabcdabcdabcy", "abcdabcy")).toBe(15);
  expect(rabin("abcxabcdabxabcdabcdabcy", "abcdabca")).toBe(-1);
  expect(rabin("abcxabcdabxaabcdabcabcdabcdabcy", "abcdabca")).toBe(12);
  expect(rabin("abcxabcdabxaabaabaaaabcdabcdabcy", "aabaabaaa")).toBe(11);
});

test("should detect the substring", () =>
  fc.assert(
    fc.property(
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      (a, b, c) => rabin(a + b + c, b) !== -1
    )
  ));

test("should send back a valid start", () =>
  fc.assert(
    fc.property(fc.fullUnicodeString(), fc.fullUnicodeString(), (a, b) => {
      const idx = rabin(a, b);
      return idx === -1 || a.substr(idx, b.length) === b;
    })
  ));
