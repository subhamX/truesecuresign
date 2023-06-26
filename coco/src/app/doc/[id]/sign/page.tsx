import { getUser } from "@/app/auth/getAuthUser"
import { Navbar } from "@/components/Navbar"
import { RedirectToAPageWithToast } from "@/components/RedirectToAPageWithToast"
import { getDocumentInstance } from "@/utils/db/document"
import { getPresignedUrl } from "@/utils/storage"
import { SignDocClient } from "./SignDocClient"
import { DOC_VIEW } from "@/app/routes-config"



export default async function (props: any) {
    const user = await getUser()
    if (!user) {
        return <RedirectToAPageWithToast text="You are not logged in" route="/" />
    }

    const docId = props.params.id

    const doc = await getDocumentInstance(docId, user.userID)

    if(doc.hasBeenSigned){
        return <RedirectToAPageWithToast text="You have already signed this document" route={DOC_VIEW(docId)} />
    }


    return (
        <div>
            <Navbar user={user} />



            <div>
                <SignDocClient docId={docId} />
            </div>

        </div>
    )
}



