'use client'

import { useEffect } from "react";

export default function Profile() {

    useEffect(() => {
        require('@passageidentity/passage-elements/passage-profile')
    }, []);
  return (
      <div>
        <passage-profile app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
      </div>
  );
}
