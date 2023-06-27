import fetch from "node-fetch"
import { serverUrl } from "./serverApi"
import { error } from "console"


export const registerCredsAndPublicKeyToServer = async (props: {
    publicKey: string,
    email: string,
    token: string,
}) => {
    const response = await fetch(`${serverUrl}/api/cli/register`, {
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
    return status
}
