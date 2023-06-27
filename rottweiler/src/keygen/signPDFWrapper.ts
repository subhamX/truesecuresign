import { certificatePath, privateKeyPath } from "../utils/pathsConstants";

import forge from 'node-forge';
import fs from 'fs';


export async function signPDFWrapper(pdfPath: string, signedDocPath: string) {

    const certificatePem = fs.readFileSync(certificatePath, 'utf8');
    const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');

    const pdfBytes = fs.readFileSync(pdfPath);


    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(pdfBytes);
    p7.addCertificate(forge.pki.certificateFromPem(certificatePem));
    p7.addSigner({
        key: forge.pki.privateKeyFromPem(privateKeyPem),
        certificate: forge.pki.certificateFromPem(certificatePem),
        digestAlgorithm: forge.pki.oids.sha256,
    });
    p7.sign();


    const signedPdfDer = forge.asn1.toDer(p7.toAsn1()).getBytes();


    fs.writeFileSync('output.p7', signedPdfDer, 'binary');

}

