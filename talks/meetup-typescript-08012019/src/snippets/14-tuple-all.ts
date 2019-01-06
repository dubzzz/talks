
type Arbitrary<T> = { generate: () => T; };
declare const genNumber: Arbitrary<number>;
declare const genString: Arbitrary<string>;


declare function tuple<Ts extends any[]>(...arbs: Ts)
: Arbitrary<{
    [K in keyof Ts]:
        Ts[K] extends Arbitrary<infer U>
            ? U
            : never
}>;



const tupleGenerator: Arbitrary<[
    number,
    string,
    string
]> = tuple(genNumber, genString, genString);


