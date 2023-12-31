import { getUser } from "@/app/auth/getAuthUser"
import { Navbar } from "@/components/Navbar"
import { RedirectToAPageWithToast } from "@/components/RedirectToAPageWithToast"
import { DocClient } from "./DocClient"
import { getDocumentInstance } from "@/utils/db/document"
import { getPresignedUrl } from "@/utils/storage"



export default async function (props: any) {
    const user = await getUser()
    if (!user) {
        return <RedirectToAPageWithToast text="You are not logged in" route="/" />
    }

    const docId = props.params.id

    const doc = await getDocumentInstance(docId, user.userID)

    // fetch doc from db
    const signedUrl= await getPresignedUrl(doc.documentPathInStorageBucket)

    let signedDocSignedUrl = undefined
    if(doc.signedDocumentPathInStorageBucket){
        signedDocSignedUrl= await getPresignedUrl(doc.signedDocumentPathInStorageBucket)
    }


    return (
        <div>
            <Navbar user={user} />
            <DocClient signedDocSignedUrl={signedDocSignedUrl} signedUrl={signedUrl} doc={{...doc, _id: doc._id.toHexString()}} />
        </div>
    )
}



