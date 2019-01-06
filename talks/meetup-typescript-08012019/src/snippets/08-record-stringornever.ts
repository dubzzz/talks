/*


type RemoveArbitrary<T> =
    T extends Arbitrary<U>
        ? U 
        : never;


