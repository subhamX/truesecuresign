'use client'

import { toast } from "react-toastify"
import { LOGOUT_API } from "./routes-config"


export const logOutUserHandler = async () => {
    try {
        localStorage.removeItem('psg_cred_obj')
        localStorage.removeItem('psg_auth_token')
        localStorage.removeItem('psg_last_login')
        const res = await fetch(LOGOUT_API)
        const data = await res.json()
        if (data.error) throw new data.error
        else {
            toast.success('Logged out', {
                autoClose: 500,
                onClose: () => {
                    window.location.href = '/'
                }
            })
        }
    } catch (e: any) {
        toast.error(e.message)
    }
}
