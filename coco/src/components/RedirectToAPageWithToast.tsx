'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

export const RedirectToAPageWithToast = ({route, text, type='error'}:{
    route: string,
    text: string,
    type?: 'error' | 'success' | 'info'
}) => {
    const router = useRouter()
    useEffect(() => {
        toast(text, {
            type,
            autoClose: 1000,
            onClose: () => {
                router.push(route)
            }
        })
    })

    return null
}
