import path from "path"
import { docuFolder } from "./initCheck"



export const userCredsPath=path.join(docuFolder, 'user.json')
export const privateKeyPath=path.join(docuFolder, 'private_key.pem')
export const intermediaryCertificatePath=path.join(docuFolder, 'certificate.csr')
export const certificatePath=path.join(docuFolder, 'certificate.pem')
export const tmpDir=path.join(docuFolder, 'tmp')
export const p12CertificatePath=path.join(docuFolder, 'certificate.p12')
