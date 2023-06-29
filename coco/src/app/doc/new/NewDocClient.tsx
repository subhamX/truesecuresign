'use client'

import { useState } from "react"
import { toast } from "react-toastify"
import { DOC_VIEW, NEW_DOC_UPLOAD_API } from "../../routes-config"
import { useRouter } from "next/navigation"
import { FileUploader } from "react-drag-drop-files"



export const NewDocClient = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleChange = async (file: File) => {
        if (file) {
            try {
                setIsSubmitting(true)
                toast.info('Uploading file...')

                const formData = new FormData()
                formData.append('document', file)

                const res = await fetch(NEW_DOC_UPLOAD_API, {
                    method: 'POST',
                    body: formData
                })
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                toast.success('File uploaded successfully')
                router.push(DOC_VIEW(data.newDocument._id))

            } catch (e: any) {
                toast.error(e.message)
                setIsSubmitting(false)
            }
        } else {
            toast.info('No file selected')
        }
    }


    return (
        <div className="mx-auto max-w-2xl">

            <div className="text-2xl font-bold mb-4">
                Upload a new doc
            </div>


            {isSubmitting ?
                (

                    <div className="flex items-center flex-col gap-2 justify-center">
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

        </div>
    )
}
