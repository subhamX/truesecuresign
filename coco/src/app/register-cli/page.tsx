import { RedirectToAPageWithToast } from "@/components/RedirectToAPageWithToast"
import { getUser } from "../auth/getAuthUser"
import { Navbar } from "@/components/Navbar"
import jsonwebtoken from 'jsonwebtoken'
import { RegisterCLIClient } from "./RegisterCLIClient"





export default async function () {
    const user = await getUser()

    if (!user) {
        return <RedirectToAPageWithToast text="You are not logged in" route="/" />
    }

    const jwtSecret = process.env.JWT_SECRET as string
    const tmpToken = jsonwebtoken.sign({ email: user.email, id: user.userID }, jwtSecret)

    return (
        <div>
            <Navbar user={user} />

            <RegisterCLIClient user={user} tmpToken={tmpToken} />
        </div>
    )
}



