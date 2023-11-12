/*
type Arbitrary<T> = { generate: () => T; };
declare const genNumber: Arbitrary<number>;
declare const genString: Arbitrary<string>;


declare function tuple<T1>(
    a1: Arbitrary<T1>
): Arbitrary<[T1]>;

declare function tuple<T1, T2>(
    a1: Arbitrary<T1>,
    a2: Arbitrary<T2>
): Arbitrary<[T1, T2]>;

declare function tuple<T1, T2, T3>(
    a1: Arbitrary<T1>,
    a2: Arbitrary<T2>,
    a3: Arbitrary<T3>
): Arbitrary<[T1, T2, T3]>;



const tupleGenerator: Arbitrary<[
    number,
    string,
    string
]> = tuple(genNumber, genString, genString);


