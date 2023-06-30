import Passage from "@passageidentity/passage-node";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest } from "next/server";
import { passageConfig } from "./passageConfig";

const passage = new Passage(passageConfig);

export type UserFromAuth = {
    userID: string;
    full_name: string | null;
    email: string;
}
export const getUser = async (): Promise<UserFromAuth | null> => {
    try {
        const userID = await getUserId();

        if (userID) {
            const { email, phone, user_metadata } = await passage.user.get(userID);

            // user authenticated
            return {
                userID,
                full_name: user_metadata?.full_name as string | null,
                email
            };
        }
        return null;
    } catch (e) {
        // failed to authenticate
        // we recommend returning a 401 or other "unauthorized" behavior
        console.log(e);
        return null;
    }
}


export async function getUserId() {
    const authToken = cookies().get("psg_auth_token")?.value;
    return getUserIdFromCookie(authToken ?? "");

}

export const getUserIdFromCookie = async (authToken: string) => {
    const userID = await passage.validAuthToken(authToken);
    return userID;
}
