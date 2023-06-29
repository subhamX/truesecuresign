import { getUserIdFromCookie } from "@/app/auth/getAuthUser"
import { createDocumentInstance } from "@/utils/db/document"
import { uploadFileToStorageBucket } from "@/utils/storage"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import Passage from "@passageidentity/passage-node"
import { passageConfig } from "@/app/auth/passageConfig"
import { UserIdentity, getUserIdentity } from "@/utils/db/userIdentity"
import mongoDbClientPromise, { databaseId } from "@/utils/db/mongodb"
import { Status } from "./Status"



export const POST = async (req: NextRequest) => {
    try {
        // get user id
        const {email, token, publicKey} = await req.json()


        if(!email){
            throw new Error("email is required")
        }

        if(!token){
            throw new Error("token is required")
        }

        // validate the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        if(!decoded || decoded?.email !== email){
            throw new Error("invalid token")
        }


        // check if the user exists
        // unfortunately, we can't filter by email. :()
        const user=await new Passage(passageConfig).user.get(decoded.id)
        if(!user){
            throw new Error("invalid user or token")
        }

        if(!publicKey){
            return NextResponse.json({ status: Status.CREDS_OK_NO_PUBLIC_KEY_GIVEN })
        }

        // get the user id
        const userId = user.id
        const userIdentity = await getUserIdentity(userId, publicKey);

        let response:Status;
        if(!userIdentity){
            response=Status.KEYS_NOT_MATCHING
        }else{
            response=Status.KEYS_MATCHING
        }

        return NextResponse.json({ status: response })
    } catch (e: any) {
        console.log("e", e)
        return NextResponse.json({ error: e.message })
    }
}

