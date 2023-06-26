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


    // async function addDoc(data: any) {
    //     'use server'

    //     console.log('data', data)
    //     // const cartId = cookies().get('cartId')?.value
    //     // await saveToDb({ cartId, data })
    // }

    // upload file

    // files/${uuid()}/raw/


    return (
        <div>
            <Navbar user={user} />

            <NewDocClient />

        </div>
    )
}



