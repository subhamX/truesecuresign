import { RedirectToAPageWithToast } from "@/components/RedirectToAPageWithToast"
import { getUser } from "../../auth/getAuthUser"
import { Navbar } from "@/components/Navbar"
import jsonwebtoken from 'jsonwebtoken'
import { toast } from "react-toastify"
import { NewDocClient } from "./NewDocClient"





export default async function () {
    const user = await getUser()
    if (!user) {
        return <RedirectToAPageWithToast text="You are not logged in" route="/" />
    }

    return (
        <div>
            <Navbar user={user} />

            <NewDocClient />

        </div>
    )
}



