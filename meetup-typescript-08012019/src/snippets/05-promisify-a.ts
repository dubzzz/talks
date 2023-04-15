/*
type Data = {
    id: number;
    username: string;
};
type PromisifiedData = {
    id: Promise<number>;
    username: Promise<string>;
};
declare const data: Data;



declare function promisify<T>(s: T): {
    [K in keyof T]: Promise<T[K]>
};



const promisifiedData: PromisifiedData = promisify(data);

