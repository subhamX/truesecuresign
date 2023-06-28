'use client'

import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";

export default function ProfileClient({
  user
}:{
  user: any
}) {

  useEffect(() => {
    require('@passageidentity/passage-elements/passage-profile')
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <passage-profile app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
    </div>
  );
}
