import fetch from "node-fetch"
import { serverUrl } from "./serverApi"


export const getSignedUrlFromServer = async (props: {
    token: string,
    documentId: string,
}) => {
    const response = await fetch(`${serverUrl}/api/cli/get-signed-url`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(props)
    })
    const { signedUrl, error } = (await response.json()) as any

    if(error){
        throw new Error(error)
    }

    return signedUrl
}
