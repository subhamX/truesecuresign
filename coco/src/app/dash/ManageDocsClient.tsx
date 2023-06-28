import { DocumentInstance } from "@/utils/models/DocumentInstance"
import { ModelWithId, ModelWithStringId } from "@/utils/models/ModelWithId"
import Link from "next/link"
import { DOC_VIEW } from "../routes-config"



export const ManageDocsClient = ({ docs }: {
    docs: ModelWithStringId<DocumentInstance>[]
}) => {
    return (
        <div>
            <div className="mx-auto max-w-2xl">

                <div className="text-2xl font-bold mb-4">
                    All documents
                </div>

                <div className="text-sm text-gray-500 mb-5">
                    Here you can see all the documents you've uploaded, signed, or received.
                </div>



                {docs.map((doc) => {
                    return (
                        <Link className="flex max-w-2xl min-w-2xl mx-auto" prefetch={false} href={DOC_VIEW(doc._id)} key={doc._id}>
                            <div className="card-primary my-4 cursor-pointer flex flex-col gap-1 text-sm bg-gray-100 border hover:bg-gray-300  border-black px-3 py-2 transition-all w-full">
                                <div className="flex gap-1 text-lg font-bold">
                                    <span className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 via-purple-600 to-blue-500  text-transparent bg-clip-text'>
                                        {doc.name}
                                    </span>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="font-bold">Created At:</span>
                                    <span>
                                        {doc.createdAt.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="font-bold">Has been signed:</span>
                                    <span className="">
                                        {doc.hasBeenSigned ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
                                    </span>
                                </div>

                                {doc.hasBeenSigned &&

                                    <>
                                        <div className="flex gap-1 items-center">
                                            <span className="font-bold">Signed At:</span>
                                            <span className="">
                                                {doc.signedAt?.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* <div className="font-bold text-blue-600">
                                            <span className="">Signed Document URL</span>
                                            <span className="">
                                                {project.signedDocumentPathInStorageBucket}
                                            </span>
                                        </div> */}

                                    </>
                                }

                                {/* <div className="font-bold text-blue-600">
                                    <span className="">Last Modified Version Document URL (Unsigned)</span>
                                    <span className="">
                                        {project.documentPathInStorageBucket}
                                    </span>
                                </div> */}


                            </div>
                        </Link>
                    )
                })}


            </div>

        </div>
    )
}
