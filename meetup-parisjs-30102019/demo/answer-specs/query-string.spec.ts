import * as m from "query-string";
import * as fc from "fast-check";

const paramsArb = fc.dictionary(
  fc.fullUnicodeString(1, 10),
  fc.oneof(
    fc.fullUnicodeString(),
    fc.constant(null),
    fc.array(fc.oneof(fc.fullUnicodeString(), fc.constant(null)), 2, 10)
  )
);

const optsArb = fc.record({
  arrayFormat: fc.constantFrom(
    "bracket" as const,
    "index" as const,
    "none" as const
  ),
  strict: fc.boolean()
});

test("query-string rox", () =>
  fc.assert(
    fc.property(paramsArb, optsArb, (obj, opts) => {
      expect(m.parse(m.stringify(obj, opts), opts)).toEqual(obj);
    })
  ));
