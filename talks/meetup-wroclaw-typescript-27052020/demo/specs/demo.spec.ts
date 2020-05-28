import * as fc from 'fast-check';
import { knuth } from '../src/knuth';
import * as _ from 'underscore';

test('property', () => {
  fc.assert(
    fc.property(
      fc.anything({ withBoxedValues: true, withSet: true }),
      fc.anything({ withBoxedValues: true, withSet: true }),
      (a, b) => {
        return _.isEqual(a, b) === _.isEqual(b, a);
      }
    ),
    { numRuns: 100000 }
  );
});
