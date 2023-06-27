import { readFileSync } from "fs";
import crypto from 'crypto'

export function getPublicKeyFromCertificate(certificatePath: string) {
  // Read the certificate file
  const certificate = readFileSync(certificatePath);

  // Extract the public key from the certificate
  const publicKey = crypto.createPublicKey({ key: certificate, format: 'pem' });

  return publicKey.export({ type: 'spki', format: 'pem' }).toString();
}
