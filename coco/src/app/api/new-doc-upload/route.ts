import { getUserIdFromCookie } from "@/app/auth/getAuthUser"
import { createDocumentInstance } from "@/utils/db/document"
import { uploadFileToStorageBucket } from "@/utils/storage"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"


const rawDocumentPrefix = (documentId: string) => `documents/${documentId}`

export const POST = async (req: NextRequest) => {
    try {
        // get user id
        const cookie = req.cookies.get("psg_auth_token")?.value
        const userID = await getUserIdFromCookie(cookie ?? "")
        if (!userID) {
            return NextResponse.json({ error: "user not authenticated" })
        }

        const body = await req.formData()
        const file = body?.get("document") as File // file
        if (!file || !file.name) {
            return NextResponse.json({ error: "no document key or it is invalid" })
        }

        // upload
        const documentId = new ObjectId()
        const prefix = rawDocumentPrefix(documentId.toHexString())

        await uploadFileToStorageBucket(
            file,
            prefix,
        )
        const documentPathInStorageBucket = `${prefix}/${file.name}`

        // create a new document in table

        const response = await createDocumentInstance({
            _id: documentId,
            name: file.name,
            documentPathInStorageBucket,
            createdAt: new Date(),
            ownerId: userID,
            hasBeenSigned: false,
        })

        return NextResponse.json({ newDocument: response })
    } catch (e: any) {
        console.log("e", e)
        return NextResponse.json({ error: e.message })
    }
}

