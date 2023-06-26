'use client'

import { CodeBlock } from "@/app/register-cli/CodeBlock"
import { REGISTER_CLI_SCREEN } from "@/app/routes-config"
import Link from "next/link"




export const SignDocClient = ({
    docId
}: {
    docId: string
}) => {

    return (
        <div className="mx-auto max-w-2xl">

            <div className="text-2xl font-bold mb-4">
                Sign Document
            </div>

            <div className="text-sm text-gray-500 mb-5">
                We will now guide you to sign the document.

                <div className="p-2 mt-2 border border-blue-700 mb-4 text-xs text-blue-800 rounded-lg bg-blue-50" role="alert">

                    Please ensure that you've installed a command line tool to sign your documents. It's a one time setup and you can use it to sign all your documents in future.

                    You can find more info on registering the CLI tool <Link className="text-blue-500" href={REGISTER_CLI_SCREEN}>here</Link>
                </div>
            </div>

            <div className="mt-5">
                <div>
                    Now, on your terminal, run the following command to sign the document:
                </div>


                <CodeBlock text={`npx truesecuresign sign ${docId}`} />

            </div>

        </div>
    )
}
