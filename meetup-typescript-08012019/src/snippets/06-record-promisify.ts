/*

type Arbitrary<T> = { generate: () => T; };
declare const userStructure: {
    id: Arbitrary<number>,
    username: Arbitrary<string>
};
type User = { id: number; username: string; };



declare function record<T>(s: T): Arbitrary<{
    [K in keyof T]: RemoveArbitrary<T[K]>
}>;



const userGenerator: Arbitrary<User>
        = record(userStructure);