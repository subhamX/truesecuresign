'use client'

import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";

export default function AuthStartClient() {
    useEffect(() => {
        require('@passageidentity/passage-elements/passage-auth');
    }, []);

    return (
        <div>
            <passage-auth app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-auth>
        </div>
    )
}
