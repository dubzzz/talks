/*
type Arbitrary<T> = { generate: () => T; };
declare const userStructure: {
    id: Arbitrary<number>,
    username: Arbitrary<string>
};
type User = { id: number; username: string; };



declare function record<T>(s: T): Arbitrary<{
    [K in keyof T]: T[K] extends Arbitrary<infer U>
        ? U
        : never
}>;



const userGenerator: Arbitrary<User>
        = record(userStructure);