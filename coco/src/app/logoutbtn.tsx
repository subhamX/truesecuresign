'use client'

import { toast } from "react-toastify"
import { LOGOUT_API } from "./routes-config"


export const logOutUserHandler = async () => {
    try {
        document.cookie = 'psg_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        localStorage.removeItem('psg_cred_obj')
        localStorage.removeItem('psg_auth_token')
        const res = await fetch(LOGOUT_API)
        const data = await res.json()
        if (data.error) throw new data.error
        else {
            toast.success('Logged out')
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        }
    } catch (e: any) {
        toast.error(e.message)
    }
}
