"use client"

import { DescriptionText } from "@/app/doc/[id]/DocClient"
import { CodeBlock } from "@/app/register-cli/CodeBlock"
import { CopySVG } from "@/app/register-cli/CopySVG"
import { copyTextToClipboard } from "@/app/register-cli/copyTextToClipboard"
import { VALIDATE_DOC_API, VALIDATE_DOC_SCREEN } from "@/app/routes-config"
import { UserIdentity } from "@/utils/db/userIdentity"
import { DocumentInstance } from "@/utils/models/DocumentInstance"
import { ModelWithStringId } from "@/utils/models/ModelWithId"
import Link from "next/link"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { toast } from "react-toastify"

export const ValidateDocClient = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showUpload, setShowUpload] = useState(true)


    const [data, setData] = useState<{
        doc: ModelWithStringId<DocumentInstance>,
        user: ModelWithStringId<UserIdentity>,
        email: string
    } | null>(null)


    const handleChange = async (file: File) => {
        // upload file
        if (file) {
            try {
                setIsSubmitting(true)
                toast.info('Uploading file...')

                const formData = new FormData()
                formData.append('file', file)

                const res = await fetch(VALIDATE_DOC_API, {
                    method: 'POST',
                    body: formData
                })
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                console.log(data)
                setData(data)
                setShowUpload(false)
            } catch (e: any) {
                toast.error(e.message)
            }
        } else {
            toast.info('No file selected')
        }
        setIsSubmitting(false)

    };


    return (
        <div className="mx-auto max-w-2xl">

            <div className="text-2xl font-bold mb-4">
                Validate Doc
            </div>

            <div className="text-sm text-gray-500 mb-5">
                This is a free service to validate your documents. You can use this service to validate the <span className="text-gray-600">signature</span> of any document. Incase the doc is signed by us, we shall be providing more info on the signer.
                {/* <div className="p-2 mt-2 border border-blue-700 mb-4 text-xs text-blue-800 rounded-lg bg-blue-50" role="alert">
                    Please ensure that you've installed a command line tool to sign your documents. It's a one time setup and you can use it to sign all your documents in future.
                </div> */}
            </div>


            {data &&

                (

                    <div className="text-xs">

                        <div className="relative">
                            <div className="bg-gray-700 h-40 rounded-t-xl overflow-hidden">
                                <img className="w-full" src="https://unsplash.com/photos/T_Qe4QlMIvQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fHdhbGxwYXBlcnxlbnwwfHx8fDE2NTkxODMyODI&force=true&w=640" />
                            </div>
                        </div>
                        <div className="border bg-base-200 rounded-b-xl pt-8 p-5 flex flex-col gap-2">
                            <DescriptionText name="Signer Email" value={data.email} />
                            <DescriptionText name="Document Name" value={data.doc.name} />
                            <DescriptionText name="Signed At" value={new Date(data.doc.signedAt as any).toString()} />
                            <DescriptionText name="Created At" value={new Date(data.doc.createdAt as any).toString()} />
                            {/* <DescriptionText name="User Public Key" value={data.user.publicKey} /> */}


                            <div
                                className={
                                    "uppercase font-bold  text-gray-500 "
                                }
                            >
                                Signer Public Key
                            </div>


                            <div className="whitespace-pre-wrap  max-w-full">
                                <div onClick={() => copyTextToClipboard('text')} className="cursor-pointer flex items-center gap-3 justify-between text-white bg-gray-500 max-w-full overflow-scroll font-mono text-xs py-3 px-4 rounded-md">
                                    <div className="flex gap-1">
                                        <span>{data.user.publicKey}</span>
                                    </div>
                                    <span className="flex text-white  w-5 h-5 hover:text-gray-400 duration-200">
                                        <CopySVG />
                                    </span>
                                </div>
                            </div>

                        </div>

                    </div>
                )}




            <div className="mt-5">

                {
                    !showUpload ? (
                        <button onClick={() => {
                            setShowUpload(true)
                            setData(null)
                        }} className={`font-medium mt-2 px-3 hover:bg-gray-200 text-center rounded-lg text-sm py-2 transition-all text-white bg-black hover:text-black  border border-black`}>
                            Validate Another Doc
                        </button>
                    ) :
                        (
                            <>
                                {
                                    isSubmitting ?
                                        (
                                            <div className="flex items-center flex-col gap-2 justify-center" >
                                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                                                {/* Uploading... */}
                                            </div>
                                        ) : (


                                            <div className="dontshowanyinput">
                                                <FileUploader handleChange={handleChange} name="file" types={['PDF']} >
                                                    <div className="cursor-pointer mx-auto max-w-screen-lg h-full">
                                                        <div
                                                            className=" border-dashed border-2 border-gray-400 pointer-events-none p-4 flex flex-col items-center justify-center rounded-md"
                                                        >
                                                            <i>
                                                                <svg
                                                                    className="fill-current w-12 h-12 mb-3 text-blue-700"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                                                </svg>
                                                            </i>
                                                            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                                                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>&nbsp;click over here!
                                                            </p>
                                                        </div>

                                                    </div>
                                                </FileUploader>
                                            </div>
                                        )}
                            </>


                        )
                }



            </div>

        </div >
    )

}
