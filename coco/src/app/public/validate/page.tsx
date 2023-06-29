import { getUser } from "@/app/auth/getAuthUser"
import { ValidateDocClient } from "./ValidateDocClient"
import { Navbar } from "@/components/Navbar"



export default async () => {
    const user = await getUser()

    return (
        <div>
            <Navbar user={user} />
            <ValidateDocClient />
        </div>
    )
}
