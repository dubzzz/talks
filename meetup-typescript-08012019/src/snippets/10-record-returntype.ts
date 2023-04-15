/*


type RemoveArbitrary<T> =
    T extends Arbitrary<infer U>
        ? U 
        : never;


