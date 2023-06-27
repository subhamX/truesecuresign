'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

export const RedirectToAPageWithToast = ({route, text}:{
    route: string,
    text: string
}) => {
    const router = useRouter()
    useEffect(() => {
        toast.error(text, {
            autoClose: 1000,
            onClose: () => {
                router.push(route)
            }
        })
    })

    return null
}
