import fs from 'fs';
import os from 'os';
import path from 'path';
import { runCommand } from '../utils/runCommand';
import { docuFolder } from '../utils/initCheck';
import { privateKeyPath, intermediaryCertificatePath, certificatePath } from '../utils/pathsConstants';
import chalk from 'chalk';
import { KEYUTIL, KJUR } from 'jsrsasign';


// Function to generate the private key and certificate
export async function generateKeyAndCertificate(email: string) {
  // Check if OpenSSL is available in the system path
  await runCommand('openssl version');

  // Variables for certificate information
  const COUNTRY = 'US';
  const STATE = 'California';
  const CITY = 'San Francisco';
  const ORGANIZATION = 'TrueSecureSign';
  const COMMON_NAME = 'truesecuresign.subhamx.dev';
  const EMAIL = email;

    // STEP1. generate a key pair
    var rsaKeypair = KEYUTIL.generateKeypair('RSA', 1024) as any;
    var hN = rsaKeypair.prvKeyObj.n.toString(16);

    var pem = KJUR.asn1.x509.X509Util.newCertPEM(
        {
            serial: { int: 4 },
            sigalg: { name: 'SHA256withRSA' },
            notafter: { 'str': '140504235959Z' },
            subject: { str: `/C=${COUNTRY}/O=${ORGANIZATION}/CN=${COMMON_NAME}/emailAddress=${EMAIL}` },
            sbjpubkey: rsaKeypair.pubKeyObj,
            ext: [
                // { basicConstraints: { cA: true, critical: true } },
                // { keyUsage: { bin: '11' } },
                // { cRLDistributionPoints: { uri: 'http://aaa.com/a.crl' } },
                // { extKeyUsage: { array: [{ name: 'clientAuth' }] } },
            ],
            cakey: rsaKeypair.prvKeyObj as any,
            issue: { str: '/C=US/O=a' },
            sighex: hN,
        });


    var keyObj = KEYUTIL.getKey(rsaKeypair.prvKeyObj);

    // Convert the key object to PEM format
    var pemKey = KEYUTIL.getPEM(keyObj, 'PKCS1PRV');

    // save pemKey to file
    fs.writeFileSync(privateKeyPath, pemKey);
    fs.writeFileSync(certificatePath, pem);

  console.log(chalk.greenBright('Private key and certificate generated successfully. ✨'));
}
