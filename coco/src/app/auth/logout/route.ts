import Passage from "@passageidentity/passage-node"
import { NextRequest, NextResponse } from "next/server"
import { passageConfig } from "../passageConfig"
import { getUserId, getUserIdFromCookie } from "../getAuthUser"
import { prepareErrorUrl } from "./prepareErrorUrl"



export async function GET(req: NextRequest) {
    try {
        const passage = new Passage(passageConfig)
        const res = NextResponse.json({success: true});
        ["psg_cred_obj", "psg_auth_token"].forEach(e => {
            res.cookies.set(e, 'token', {
                secure: process.env.USE_SECURE_COOKIE === "1" ? true : false,
                sameSite: "lax",
                httpOnly: true,
                maxAge: -1,
            });
        })
        const authToken = req.cookies.get("psg_auth_token")?.value
        const userId = await getUserIdFromCookie(authToken ?? "");
        console.log("userId", userId)
        if (userId) {
            const aa=await passage.user.signOut(userId)
            console.log("xxx", aa)
        }
        return res
    } catch (err: any) {
        return NextResponse.json({error: err.message});
    }
}
