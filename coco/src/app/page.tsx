import Image from 'next/image'
import { getUser } from './auth/getAuthUser'
import Link from 'next/link'
import { LOGOUT_API } from './routes-config'
import { toast } from 'react-toastify'
import { Navbar } from '@/components/Navbar'

export default async function Home() {
  const user = await getUser()

  console.log(user)


  return (
    <div>
      <Navbar user={user} />


    Home


    </div>
  )
}
