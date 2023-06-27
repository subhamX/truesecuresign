import { getUserIdFromCookie } from "@/app/auth/getAuthUser"
import { createDocumentInstance, updateDocumentInstanceWithSignedDocInfo } from "@/utils/db/document"
import { uploadFileToStorageBucket } from "@/utils/storage"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import jsonwebtoken from "jsonwebtoken"

const signedDocumentPrefix = (documentId: string) => `documents_signed/${documentId}`

export const POST = async (req: NextRequest) => {
    try {
        // get user id
        const body = await req.formData()
        const file = body?.get("file") as File // file
        if (!file || !file.name) {
            return NextResponse.json({ error: "no document key or it is invalid" })
        }
        const documentId = body?.get("documentId") as string
        const token = body?.get("token") as string

        if(!documentId){
            return NextResponse.json({ error: "no document id or it is invalid" })
        }

        const decoded=jsonwebtoken.decode(token, process.env.JWT_SECRET as any) as any

        // upload
        const prefix = signedDocumentPrefix(documentId)

        await uploadFileToStorageBucket(
            file,
            prefix,
        )
        const documentPathInStorageBucket = `${prefix}/${file.name}`

        // create a new document in table

        const response = await updateDocumentInstanceWithSignedDocInfo({
            _id: new ObjectId(documentId),
            signedAt: new Date(),
            signedDocumentPathInStorageBucket: documentPathInStorageBucket,
            ownerId: decoded.id
        })

        return NextResponse.json({ newDocument: response })
    } catch (e: any) {
        console.log("e", e)
        return NextResponse.json({ error: e.message })
    }
}

