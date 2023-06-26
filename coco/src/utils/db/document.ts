import mongoDbClientPromise, { databaseId } from "@/utils/db/mongodb";
import { DocumentInstance } from "../models/DocumentInstance";
import { ModelWithId } from "../models/ModelWithId";
import { ObjectId, OptionalId } from "mongodb";

export const createDocumentInstance = async (instance: OptionalId<DocumentInstance>): Promise<ModelWithId<DocumentInstance>> => {
    const client = await mongoDbClientPromise;
    const response = await client.db(databaseId).collection("documents").insertOne(instance);

    return {
        _id: response.insertedId,
        ...instance
    };
};


export const getDocumentInstance = async (id: string, userId: string): Promise<ModelWithId<DocumentInstance>> => {
    const client = await mongoDbClientPromise;

    const response=await client.db(databaseId).collection("documents").findOne({
        _id: new ObjectId(id)
    }) as ModelWithId<DocumentInstance>;

    if(!response){
        throw new Error("No document found with that ID");
    }
    if(response.ownerId!==userId){
        console.log("You do not have permission to view this document", response.ownerId, userId);
        // obfuscate the error message
        throw new Error("No document found with that ID");
    }
    return response as any;
}
