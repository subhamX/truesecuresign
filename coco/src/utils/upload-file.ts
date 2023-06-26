import { S3Client, AbortMultipartUploadCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { uuid } from "uuidv4";


const accessKeyId = process.env.ACCESS_KEY_ID as string;
const secretAccessKey = process.env.SECRET_KEY_ID as string;
const bucketEndpoint = process.env.BUCKET_ENDPOINT as string;
const bucketName = process.env.BUCKET_NAME as string;

if (!accessKeyId) {
    throw new Error("ACCESS_KEY_ID env var is not defined")
}
if (!secretAccessKey) {
    throw new Error("SECRET_KEY_ID env var is not defined")
}
if (!bucketEndpoint) {
    throw new Error("BUCKET_ENDPOINT env var is not defined")
}
if (!bucketName) {
    throw new Error("BUCKET_NAME env var is not defined")
}


// a client can be shared by different commands.
const client = new S3Client({
    endpoint: bucketEndpoint, credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    }
});


export const uploadFileToStorageBucket = async (file: File, prefix: string) => {

    // // check that prefix end is not with .
    // if(prefix.endsWith("/")){
    //     throw new Error("prefix arg cannot end with /")
    // }

    console.log('xxx')
    const cmd = new PutObjectCommand({
        Bucket: bucketName,
        Key: `${prefix}/${file.name}`,
        Body: Buffer.from(await file.arrayBuffer()),
    })
    const data = await client.send(cmd)
    return data
}
