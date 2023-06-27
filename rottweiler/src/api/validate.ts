import fetch from "node-fetch"
import { serverUrl } from "./serverApi"

export enum Status {
    CREDS_OK_NO_PUBLIC_KEY_GIVEN,
    KEYS_MATCHING,
    KEYS_NOT_MATCHING,
}

export const validateCredsFromServer = async (props: {
    publicKey?: string,
    email: string,
    token: string,
}) => {
    const response = await fetch(`${serverUrl}/api/cli/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(props)
    })
    const { status, error } = (await response.json()) as any

    if(error){
        throw new Error(error)
    }

    return status as Status
}
