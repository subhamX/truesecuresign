import { NextRequest, NextResponse } from "next/server"
import { validateSignedDocxxx } from "@/utils/validateSignedDoc"

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.formData()
        const file = body?.get("file") as File // file
        if (!file || !file.name) {
            return NextResponse.json({ error: "no file key or it is invalid" })
        }

        // create buffer from file
        const buffer = Buffer.from(await file.arrayBuffer())
        const response=await validateSignedDocxxx(buffer)

        return NextResponse.json(response)
    } catch (e: any) {
        console.log("e", e)
        return NextResponse.json({ error: e.message })
    }
}

