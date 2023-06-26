import { ObjectId } from "mongodb";

export type ModelWithId<T> = {
    _id: ObjectId;
} & T;



export type ModelWithStringId<T> = {
    _id: string;
} & T;
