'use client'

import { UserFromAuth } from "../auth/getAuthUser"
import { CodeBlock } from "./CodeBlock"
import { CodeBlockInline } from "./CodeBlockInline"



export const RegisterCLIClient = ({
    user,
    tmpToken
}: {
    user: UserFromAuth,
    tmpToken: string
}) => {

    return (
        <div className="mx-auto max-w-2xl">

            <div className="text-2xl font-bold mb-4">
                Register CLI Client
            </div>

            <div className="text-sm text-gray-500 mb-5">
                You need to install a command line tool to sign your documents. It's a one time setup and you can use it to sign all your documents in future.

            </div>

            <div className="p-3 mb-4 text-xs text-red-800 border border-red-700 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                Please ensure that before you run this command 1password cli is installed and you've set <span className="font-mono">OP_SERVICE_ACCOUNT_TOKEN</span> environment variable.
            </div>



            <div className="mt-5">
                <div>
                    Now, on your terminal, run the following command to initialize. It will create your keys and also store them in 1password vault
                </div>



                <CodeBlock text="npx truesecuresign init" />




                <div className="p-3 mt-7 flex gap-1 flex-col border border-blue-700 mb-4 text-xs text-blue-800 rounded-lg bg-blue-50" role="alert">
                    <div className="flex flex-wrap items-center gap-1">
                        Please enter <CodeBlockInline text={user.email} /> as your email address when prompted.
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                        And <CodeBlockInline fullText={tmpToken} text={`${tmpToken.substring(0, 30)}...`} /> as the access code when prompted.
                    </div>
                </div>

            </div>

        </div>
    )
}
