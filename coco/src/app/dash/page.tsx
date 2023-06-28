import { RedirectToAPageWithToast } from "@/components/RedirectToAPageWithToast"
import { getUser } from "../auth/getAuthUser"
import { Navbar } from "@/components/Navbar"
import jsonwebtoken from 'jsonwebtoken'
import { ManageDocsClient } from "./ManageDocsClient"
import { getAllDocsForUser } from "@/utils/db/document"





export default async function () {
    const user = await getUser()
    if (!user) {
        return <RedirectToAPageWithToast text="You are not logged in" route="/" />
    }


    // get all docs
    const docs = await getAllDocsForUser(user.userID)

    return (
        <div>
            <Navbar user={user} />

            <ManageDocsClient docs={docs.map(e => ({...e, _id: e._id.toString()}))} />

        </div>
    )
}



