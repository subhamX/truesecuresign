import Link from 'next/link';
import { getUser } from './auth/getAuthUser';
import { Navbar } from '@/components/Navbar';
import { PrimaryButton } from './PrimaryButton';


export default async function Home() {
  const user = await getUser()

  return (
    <main>
      <Navbar user={user} />
      <div className="px-4 mb-10 pt-16 relative">

        <section id="" className="">
          <div className="flex gap-10 flex-col sm:flex-row w-full justify-center items-center">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div
                  className="mx-auto max-w-3xl text-center mb-6 wow fadeInUp"
                >
                  <h2 className="font-extrabold text-4xl sm:text-5xl text-gray-800">
                    Sign, and Edit your docs <span className='from-fuchsia-500 via-red-500 to-orange-600 bg-clip-text text-transparent bg-gradient-to-l'> securely!</span>
                  </h2>
                  <p className="text-gray-600 mt-3 text-base md:text-lg leading-relaxed md:leading-relaxed max-w-[570px] mx-auto">
                    Safely sign your documents while retaining full control of your keys. Unlike others platforms, we don't manage your keys and they never leave your laptop.
                  </p>
                </div>
              </div>

              {user ? <Link href={'/dash'} className="mx-auto w-fit mb-6">
                <PrimaryButton text='Go to your dashboard. 😎' />
              </Link> :
                <Link href={'/auth/start'} className="mx-auto w-fit mb-6">
                  <PrimaryButton text='Get started. 🚀' />
                </Link>
              }

            </div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">

                <div className="text-center">
                  <img
                    src="/undraw_secure_files_re_6vdh (2).svg"
                    alt="image"
                    className="max-w-xl w-full mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="features" className="pt-[100px]">





          <div className=' bg-[#f4f9f7] w-screen py-16 px-4'>

            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text font-bold text-4xl mb-4 text-center">
              Features ✨
            </div>


            <div className='max-w-3xl mx-auto flex flex-col gap-9'>


              <div className='flex flex-col-reverse sm:flex-row gap-8 items-center'>
                <div>
                  <span className='font-bold'>
                    Enhanced Security:
                  </span>

                  TrueSecureSign ensures utmost security by storing both the private key and certificate locally, reducing the risk of unauthorized access to sensitive documents.
                </div>
                <img className='max-w-xs w-full' src="/undraw_secure_login_pdn4.svg" alt="" />
              </div>


              <div className='flex flex-col sm:flex-row gap-8 items-center'>
                <img className='max-w-sm w-full rounded-xl' src="/1pass.png" alt="" />
                <div>
                  <span className='font-bold'>Backup and Sync with 1password:</span>
                  Safeguard your data with TrueSecureSign's backup feature, which securely stores a local backup of your private key and certificate using our CLI. Rest assured that your sensitive information is never sent to our servers or accessible by anyone, providing an added layer of privacy and control over your digital assets.
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-8 items-center'>
                <img className='max-w-xs w-full' src="/undraw_documents_re_isxv.svg" alt="" />

                <div>



                  <span className='font-bold'>

                    Easy PDF Editing:

                  </span>

                  Seamlessly edit PDFs with TrueSecureSign's user-friendly interface, empowering you to make quick modifications without the need for complex software.

                </div>
              </div>



              <div className='flex flex-col-reverse sm:flex-row gap-3 items-center'>


                <div>
                  <span className='font-bold'>Effortless Digital Signatures:</span>
                  Sign PDFs effortlessly using TrueSecureSign's intuitive signing process, providing legally binding electronic signatures that save time and streamline document workflows.

                </div>
                <img className='max-w-sm  w-full' src="/undraw_fingerprint_re_uf3f.svg" alt="" />

              </div>
            </div>



          </div>


        </section>


        <section id="about" className="pt-[100px] px-4">

          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text font-bold text-4xl mb-4 text-center">
            About Us ✨
          </div>

          <div className='max-w-3xl mx-auto flex flex-col gap-2'>

            <div>
              <span className='font-bold text-3xl'>A</span>t TrueSecureSign, our utmost priority is your security and privacy. Our innovative solution ensures that your <span className='font-bold'>private keys and certificates remain exclusively in your hands</span>, never reaching our servers.
            </div>

            <div>
              With TrueSecureSign, you are the sole entity with the power to sign documents—no one else, including us, can theoretically do it. For added peace of mind, you can locally backup your keys to <span className='font-bold'>1Password</span>, further reinforcing the layers of security.

              Trust TrueSecureSign for a truly secure and reliable PDF editing and signing experience.
            </div>

            <div>
            </div>

          </div>

          <img className='mx-auto max-w-xl  w-full' src="/undraw_team_work_k-80-m.svg" alt="" />


        </section>
      </div >

    </main >
  )
}




