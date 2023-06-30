import FormData from "form-data";
import { serverUrl } from "./serverApi";
import fetch from "node-fetch";
import { createReadStream, readFileSync } from "fs";


export const uploadSignedDoc = async (props: {
    token: string,
    documentId: string,
    filePath: string,
}) => {
    const formData = new FormData();
    formData.append('documentId', props.documentId)
    formData.append('file', readFileSync(props.filePath), props.filePath.split('/').pop() as string)
    formData.append('token', props.token)

    const response = await fetch(`${serverUrl}/api/cli/upload-signed-doc`, {
        method: "POST",
        body: formData
    })
    const json= await response.json()

    if(json.error){
        throw new Error(json.error)
    }
}
