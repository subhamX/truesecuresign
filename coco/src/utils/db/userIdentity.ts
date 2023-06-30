import { ObjectId } from "mongodb";
import { ModelWithId } from "../models/ModelWithId";
import mongoDbClientPromise, { databaseId } from "./mongodb";



export type UserIdentity = {
    areKeysAlreadyGenerated: boolean;
    passageId: string;
    keysGeneratedAt: Date;
    publicKey: string;
}


export const createUserIdentity = async (data: ModelWithId<UserIdentity>) => {
    const client=await mongoDbClientPromise
    const userIdentity = await client.db(databaseId).collection<UserIdentity>("userIdentity").insertOne(data);
    return userIdentity;
}

export const getUserIdentity = async (passageId: string, publicKey?: string) => {
    const client=await mongoDbClientPromise
    const userIdentity = await client.db(databaseId).collection<UserIdentity>("userIdentity").findOne({ passageId, publicKey  });
    return userIdentity;
}
