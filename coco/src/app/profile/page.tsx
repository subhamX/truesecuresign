
import { getUser } from "../auth/getAuthUser";
import ProfileClient from "./ProfileClient";

export default async function Profile() {
  const user = await getUser()

  return (
    <ProfileClient user={user} />
  );
}
