'use client'

import { SIGN_DOC } from "@/app/routes-config"
import { DocumentInstance } from "@/utils/models/DocumentInstance"
import {  ModelWithStringId } from "@/utils/models/ModelWithId"
import Link from "next/link"


export const DocClient = ({ doc, signedUrl, signedDocSignedUrl }: { signedUrl: string, doc: ModelWithStringId<DocumentInstance>, signedDocSignedUrl?: string }) => {
    return (
        <div className="mx-auto max-w-2xl">

            <div className="text-2xl font-bold mb-4">
                Document Workshop 👩‍💻
            </div>

            <div className="text-gray-600 text-sm mb-5">
                This is the place to edit your document, add a visual signature, and prepare it for signing.
            </div>


            <div className="text-xs">

                <div className="relative">
                    <div className="bg-gray-700 h-40 rounded-t-xl overflow-hidden">
                        <img className="w-full" src="https://unsplash.com/photos/T_Qe4QlMIvQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fHdhbGxwYXBlcnxlbnwwfHx8fDE2NTkxODMyODI&force=true&w=640" />
                    </div>
                </div>
                <div className="border bg-base-200 rounded-b-xl pt-8 p-5 flex flex-col gap-2">
                    <DescriptionText name="Document Name" value={doc.name} />
                    <DescriptionText name="Signing Status" value={doc.hasBeenSigned ? 'Signed' : 'Not Signed'} />
                    <DescriptionText name="Created At" value={doc.createdAt.toString()} />
                </div>

            </div>



            <div className="p-3 mt-3 flex gap-1 flex-col border border-blue-700 mb-4 text-xs text-blue-800 rounded-lg bg-blue-50" role="alert">
                Unfortunately our PDF rendering engine with edit mode is not ready yet. You can still sign the document securely with your keys. 😎
                <div className="mt-3">
                    <div>
                        You can download the document from the link below:
                    </div>
                    <a target="_blank" href={signedUrl} className="text-gray-700">
                        {signedUrl.substring(0, 50)}...
                    </a>
                </div>
            </div>

            {doc.hasBeenSigned ? (

                <div className="mt-5">
                    <div className="text-sm text-gray-500 mb-5 space-x-1">
                        <span>
                            Yay 🎉! It has been signed. You can download the signed document from
                        </span>
                        <a target="_blank" href={signedDocSignedUrl} className="text-blue-700">
                            this link
                        </a>
                    </div>
                </div>)
                : (
                    <Link prefetch={false} href={SIGN_DOC(doc._id)} className={`font-medium mt-2 px-3 hover:bg-gray-200 text-center rounded-lg text-sm py-2 transition-all text-white bg-black hover:text-black  border border-black`}>
                        Proceed to sign document securely with your keys
                    </Link>
                )}


        </div>
    )
}



export const DescriptionText = ({
    name,
    value,
    size = "small",
    type = "justify-between",
}: {
    name: string;
    value: any;
    size?: "med" | "small";
    type?: "justify-between" | "gap-2" | "gap-1" | "justify-around";
}) => (
    <div className={"flex flex-col xs:flex-row xs:items-center " + type}>
        <div
            className={
                "uppercase font-bold  text-gray-500 " +
                (size === "small" ? "text-2xs" : "text-xs")
            }
        >
            {name}
        </div>
        <div
            className={"text-gray-900 " + (size === "small" ? "text-sm" : "text-sm")}
        >
            {value}
        </div>
    </div>
);
