# TrueSecureSign

## Motivation

In an era where large companies store and manage our encryption keys and signing keys, there is a growing concern about the security and integrity of our digital identities. Theoretically, these companies have the capability to sign on our behalf, raising questions about data authenticity and privacy. With the increasing prevalence of identity theft, deepfakes, and other fraudulent activities, it has become crucial to employ robust tools that provide assurance to recipients that they have received authentic and trustworthy data.

**TrueSecureSign was born out of the necessity for better control over our encryption and signing keys**. Our motivation is to offer a transparent service that enables users to manage their own keys securely and ensures that these keys are never sent to any server for signing purposes. By eliminating the reliance on third-party services and storing keys locally, we empower users to have complete authority and confidence in the authenticity of their digital interactions.



![Homepage](./_docs/home.png)


## Features

* **Effortless Digital Signatures with Enhanced Security:** Sign PDFs effortlessly using TrueSecureSign's intuitive signing process, providing legally binding electronic signatures that save time and streamline document workflows. TrueSecureSign emphasizes security and privacy by enabling users to manage their own encryption and signing keys. By ensuring that your keys are stored locally, and it never gets to our servers, we eliminate the risk of unauthorized access and maintain the highest level of security.

* **1Password Vaults for Secure Key Snapshots:** TrueSecureSign takes a unique approach to key backup and recovery. We leverage the secure infrastructure of 1Password vaults to take snapshots of your keys directly from your local machine. These snapshots remain confidential, ensuring that our servers never gain access to your keys. Unlike other services that generate keys themselves, leaving users unaware of who holds the power to sign on their behalf, TrueSecureSign puts you in complete control.

* **Easy PDF Editing:** Seamlessly edit PDFs with TrueSecureSign's user-friendly interface, empowering you to make quick modifications without the need for complex software.

* **Passkeys Integration for Convenient Authentication:** To enhance the user experience, TrueSecureSign integrates with Passage, a secure password manager. Passkeys offer convenience, allowing users to authenticate quickly and securely without the hassle of traditional passwords. We believe that safeguarding your keys should be seamless and user-friendly.



## Project Structure

The TrueSecureSign project comprises two main components: the CLI app and the Next.js server.

### 1. CLI (Command-Line Interface)

The `rottweiler/` directory contains the TrueSecureSign CLI application. It is designed to provide a secure and efficient way to initialize private keys and sign PDF documents. The CLI allows users to locally generate and manage their keys, ensuring that no unauthorized entity can sign documents on their behalf. The CLI app is published on [npm](https://www.npmjs.com/package/truesecuresign) for easy installation and global usage.

To begin using our CLI, simply execute the following command:

```shell
npx truesecuresign@latest init
```
For further details, please consult our [npm page](https://www.npmjs.com/package/truesecuresign).

### 2. Server (Next.js Application)

The `coco/` directory houses the Next.js application for TrueSecureSign. This web-based application offers a user-friendly interface for managing keys, certificates, and other related functionalities. The Next.js server provides a seamless experience for users to securely interact with their keys, backup them locally to 1Password, and sign documents with confidence. The server is deployed at [https://truesecuresign.vercel.app/](https://truesecuresign.vercel.app/), providing accessibility and convenience to users.

We believe that by offering both a robust CLI and a user-friendly web server, TrueSecureSign presents a comprehensive solution for managing keys securely and ensuring the authenticity of digital data.
