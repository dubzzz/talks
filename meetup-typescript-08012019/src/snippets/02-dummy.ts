/*
type Arbitrary<T> = { generate: () => T; };
declare const userStructure: {
    id: Arbitrary<number>,
    username: Arbitrary<string>
};



declare function record(recordStructure: {
    id: Arbitrary<number>,
    username: Arbitrary<string>
}): Arbitrary<{
    id: number,
    username: string
}>;

const userGenerator = record(userStructure);


