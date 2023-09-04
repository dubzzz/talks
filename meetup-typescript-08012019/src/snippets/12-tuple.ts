/*
type Arbitrary<T> = { generate: () => T; };
declare const genNumber: Arbitrary<number>;
declare const genString: Arbitrary<string>;


declare function tuple(...arbs: any[]): any;

const tupleGenerator: Arbitrary<[
    number,
    string,
    string
]> = tuple(genNumber, genString, genString);


