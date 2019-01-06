/*


type StringOrNever<T> =
    T extends string
        ? string
        : never;



type A = StringOrNever<string>;  // string
type B = StringOrNever<number>;  // never
type C = StringOrNever<any>;     // string
type D = StringOrNever<unknown>; // never


