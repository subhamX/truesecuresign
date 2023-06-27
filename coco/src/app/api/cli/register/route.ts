import { getUserIdFromCookie } from "@/app/auth/getAuthUser"
import { createDocumentInstance } from "@/utils/db/document"
import { uploadFileToStorageBucket } from "@/utils/storage"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import Passage from "@passageidentity/passage-node"
import { passageConfig } from "@/app/auth/passageConfig"
import { createUserIdentity, getUserIdentity } from "@/utils/db/userIdentity"


export const POST = async (req: NextRequest) => {
    try {
        // get user id
        const { email, token, publicKey } = await req.json()

        if (!email) {
            throw new Error("email is required")
        }

        if (!token) {
            throw new Error("token is required")
        }

        if (!publicKey) {
            throw new Error("publicKey is required")
        }

        // validate the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        if (!decoded || decoded?.email !== email) {
            throw new Error("invalid token")
        }


        // get the user from passage
        const user = await new Passage(passageConfig).user.get(decoded.id)
        if (!user) {
            throw new Error("invalid user or token")
        }


        // get the user id
        const userId = user.id
        // we're allowing the user to register their keys as many unique keys as they want; there is a unique constraint on [passageId,publicKey] field
        await createUserIdentity({
            _id: new ObjectId(),
            passageId: userId,
            publicKey,
            areKeysAlreadyGenerated: true,
            keysGeneratedAt: new Date()
        })

        return NextResponse.json({ status: 'Keys registered successfully!' })
    } catch (e: any) {
        console.log("e", e)
        return NextResponse.json({ error: e.message })
    }
}

