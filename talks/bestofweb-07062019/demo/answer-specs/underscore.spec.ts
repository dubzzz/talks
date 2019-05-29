import * as _ from "underscore";
import * as fc from "fast-check";

describe("_.toEqual", () => {
  it("should be symmetric", () => {
    fc.assert(
      fc.property(
        fc.anything({
          withBoxedValues: true,
          withMap: true,
          withSet: true
        }),
        fc.anything({
          withBoxedValues: true,
          withMap: true,
          withSet: true
        }),
        (a, b) => _.isEqual(a, b) === _.isEqual(b, a)
      ),
      {
        // eg.: numRuns: 10000
        seed: -136451885,
        path: "6780",
        endOnFailure: true
      }
    );
  });
});
