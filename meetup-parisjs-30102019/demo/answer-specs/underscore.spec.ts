import * as _ from "underscore";
import * as fc from "fast-check";

describe("_.toEqual", () => {
  it("should be symmetric", () => {
    fc.assert(
      fc.property(
        fc.anything({
          withBoxedValues: true,
          withObjectString: true
        }),
        fc.anything({
          withBoxedValues: true,
          withObjectString: true
        }),
        (a, b) => _.isEqual(a, b) === _.isEqual(b, a)
      ),
      { seed: -7457024, path: "4848", endOnFailure: true }
    );
  });
});
