import { readFileSync } from "fs";
const verifyPDF = require('pdf-signature-reader');
import crypto from 'crypto'
import { getUserIdentity } from "./db/userIdentity";
import { getDocumentInstance } from "./db/document";


export const validateSignedDocxxx = async (signedPdfBuffer: any) => {
    try {
        const {
            verified,
            authenticity,
            integrity,
            expired,
            signatures
        } = verifyPDF(signedPdfBuffer);

        if(!signatures || signatures.length == 0) {
            throw new Error("The PDF is not signed properly!")
        }


        const { contactInfo } = signatures[0].meta.signatureMeta

        const [userId, documentId] = contactInfo.split(" ")
        const cert = signatures[0].meta.certs[0].pemCertificate

        // Extract the public key from the certificate
        const publicKey = crypto.createPublicKey(cert);
        const publicKeyPEM = publicKey.export({ type: 'spki', format: 'pem' }).toString();
        const user = await getUserIdentity(userId, publicKeyPEM)

        if (!integrity) {
            throw new Error("Integrity of the PDF is not okay!")
        }
        if (!user) {
            throw new Error("PDF is signed, and the integrity is okay. But it's not signed by TrueSecureSign user!")
        }

        // fetch doc info
        const doc = await getDocumentInstance(documentId, userId)

        return {
            user,
            doc,
            email: signatures[0].meta.certs[0].issuedTo.emailAddress
        };
    } catch (err: any) {
        if (err.message.indexOf("cannot find subfilter") != -1) {
            throw new Error("The PDF is not signed!")
        } else {
            throw err;
        }
    }
}
