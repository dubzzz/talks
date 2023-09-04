/*


type Arbitrary<T> = { generate: () => T; };

declare function record(recordStructure: any): any;



declare const userStructure: {
    id: Arbitrary<number>,
    username: Arbitrary<string>
};

const userGenerator: Arbitrary<{
    id: number,
    username: string
}> = record(userStructure);


