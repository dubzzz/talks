/*
type Arbitrary<T> = { generate: () => T; };
declare const userStructure: {
    id: Arbitrary<number>,
    username: Arbitrary<string>
};



declare function record<T1, T2>(recordStructure: {
    id: Arbitrary<T1>,
    username: Arbitrary<T2>
}): Arbitrary<{
    id: T1,
    username: T2
}>;

const userGenerator = record(userStructure);


