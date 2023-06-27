import { getUserIdFromCookie } from "@/app/auth/getAuthUser"
import { createDocumentInstance, getDocumentInstance } from "@/utils/db/document"
import { getPresignedUrl, uploadFileToStorageBucket } from "@/utils/storage"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import Passage from "@passageidentity/passage-node"
import { passageConfig } from "@/app/auth/passageConfig"
import { createUserIdentity, getUserIdentity } from "@/utils/db/userIdentity"


export const POST = async (req: NextRequest) => {
    try {
        // get user id
        const { documentId, token } = await req.json()

        if (!token) {
            throw new Error("token is required")
        }

        if (!documentId) {
            throw new Error("documentId is required")
        }

        // validate the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        if (!decoded) {
            throw new Error("invalid token")
        }


        const doc=await getDocumentInstance(documentId, decoded.id);

        if(!doc){
            throw new Error("document not found")
        }

        if(doc.hasBeenSigned){
            throw new Error("document has already been signed")
        }

        const signedUrl= await getPresignedUrl(doc.documentPathInStorageBucket)
        return NextResponse.json({ signedUrl })
    } catch (e: any) {
        console.log("e", e)
        return NextResponse.json({ error: e.message })
    }
}

