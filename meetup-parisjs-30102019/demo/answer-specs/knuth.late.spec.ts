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

const isSubstring = (a: string, b: string) => knuth(a, b) !== -1;

test("should detect the substring", () =>
  fc.assert(
    fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) =>
      isSubstring(a + b + c, b)
    )
  ));
