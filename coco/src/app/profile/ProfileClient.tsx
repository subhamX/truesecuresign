'use client'

import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";

export default function ProfileClient({
  user
}: {
  user: any
}) {

  useEffect(() => {
    require('@passageidentity/passage-elements/passage-profile')
  }, []);

  return (
    <div>
      <Navbar user={user} />

      <div className="mt-10 w-full mx-auto mb-auto max-w-lg px-4">
      <div className="text-2xl font-bold mb-4">
          <h2>My Profile 🏋️</h2>
        </div>


        <passage-profile app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
      </div>
    </div >
  );
}
