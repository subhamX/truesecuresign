import { ObjectId } from "mongodb";

export type ModelWithId<T> = {
    _id: ObjectId;
} & T;
