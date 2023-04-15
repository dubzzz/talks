/*


type RetType<T> =
    T extends (...args) => (infer U)
        ? U 
        : never;



declare function f1(): number;
type A = RetType<typeof f1>; // number

const f2 = () => 'Hello Meetup TypeScript';
type B = RetType<typeof f2>; // string

type C = RetType<number>;    // never


