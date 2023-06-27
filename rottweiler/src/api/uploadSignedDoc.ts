import FormData from "form-data";
import { serverUrl } from "./serverApi";
import fetch from "node-fetch";


export const uploadSignedDoc = async (props: {
    token: string,
    documentId: string,
    filePath: string,
}) => {
    const formData = new FormData();
    formData.append('documentId', props.documentId)
    formData.append('file', require('fs').createReadStream(props.filePath))
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
