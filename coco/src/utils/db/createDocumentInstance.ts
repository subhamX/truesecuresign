import mongoDbClientPromise, { databaseId } from "@/utils/db/mongodb";
import { DocumentInstance } from "../models/DocumentInstance";
import { ModelWithId } from "../models/ModelWithId";
import { OptionalId } from "mongodb";

export const createDocumentInstance = async (instance: OptionalId<DocumentInstance>): Promise<ModelWithId<DocumentInstance>> => {
    const client = await mongoDbClientPromise;
    const response = await client.db(databaseId).collection("documents").insertOne(instance);

    return {
        _id: response.insertedId,
        ...instance
    };
};
