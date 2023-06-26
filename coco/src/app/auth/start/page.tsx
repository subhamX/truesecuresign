import { Navbar } from "@/components/Navbar";
import { getUser } from "../getAuthUser";
import AuthStartClient from "./AuthStartClient";

export default async function Auth() {

    const user=await getUser()


    return (
        <div>
            <Navbar user={user} />
            <AuthStartClient />
        </div>
    )
}
