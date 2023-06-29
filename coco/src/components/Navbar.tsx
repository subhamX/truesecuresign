"use client"

import Link from "next/link";
import { Menu } from "@headlessui/react";
import { UserFromAuth } from "@/app/auth/getAuthUser";
import { AUTH_SCREEN, MANAGE_DOCS, NEW_DOC_SCREEN, PROFILE_SCREEN, VALIDATE_DOC_SCREEN } from "@/app/routes-config";
import { logOutUserHandler } from "@/app/logoutbtn";
import { usePathname, useRouter } from "next/navigation";





function NavItemsWrapper({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <Menu>

            {({ open }) => (
                <>
                    <Menu.Button as="button" className="block transition-all lg:hidden  py-[6px] rounded-lg" >Menu</Menu.Button>
                    <div className={`absolute right-4 py-5 lg:py-0 lg:px-4 xl:px-6 bg-white lg:bg-transparent shadow-lg rounded-xl max-w-[260px] w-full lg:max-w-full lg:w-full top-full lg:block lg:static lg:shadow-none ${!open ? "hidden" : ""}`}>
                        <NavItems isAuthenticated={isAuthenticated} />
                    </div>
                </>
            )}

        </Menu>
    )
}


export const Navbar = ({ user }: { user: UserFromAuth | null }) => {
    return (
        <header className="bg-transparent mb-8 backdrop-blur-sm border-b h-16 top-0 right-0 z-40 w-screen flex items-center transition-all sticky">
            <div className="px-4 sm:px-12 w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="w-60">
                        <Link href="/" className="header-logo w-full block py-5">
                            TrueSecureSign
                            {/* <img src="/assets/faqGPT-logos_transparent_trim.png" alt="logo" className="w-full max-w-[150px]" /> */}
                        </Link>
                    </div>
                    <NavItemsWrapper isAuthenticated={!!user} />
                </div>
            </div>
        </header>

    );
};


const NavItems = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const pathname = usePathname()
    const isAuthStart = (pathname === "/auth/start")


    return (
        <div className="flex items-center font-medium flex-col gap-1 lg:flex-row justify-end">

            {!isAuthenticated &&
                <>
                    <NormalNavLink href='/#features' text="Features" />
                    <NormalNavLink href='/#about' text="About" />
                    {/* <NormalNavLink href='/contact' text="Contact" /> */}


                    {!isAuthStart &&

                        <Link prefetch={false} href={AUTH_SCREEN}>
                            <button
                                className="cursor-pointer font-medium w-full max-w-[240px] lg:w-fit lg:mx-3 px-3 hover:bg-blue-700 border-blue-700 border hover:text-white text-blue-700 bg-blue-200 text-center rounded-lg text-sm py-2 transition-all  hover:text-primary">
                                Sign In
                            </button>
                        </Link>
                    }

                </>
            }


            <Link href={VALIDATE_DOC_SCREEN} className="w-full max-w-[210px] lg:w-fit lg:mx-3">

                <Menu.Item as='div' className={`font-medium border border-pink-600  w-full px-3 hover:bg-gray-200 text-center rounded-lg text-sm py-2 transition-all`}>

                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-600">
                        Validate any doc
                    </div>

                </Menu.Item>
            </Link>


            {
                isAuthenticated && <>
                    {/* <NormalNavLink href='/project/new' text="Create new Project" /> */}
                    <NormalNavLink href={PROFILE_SCREEN} text="Profile & Subscription" />
                    <NormalNavLink href='/register-cli' text="Register CLI" />
                    <NormalNavLink href={NEW_DOC_SCREEN} text="New Doc" />




                    <Menu.Item as='div' onClick={logOutUserHandler} className={`cursor-pointer font-medium w-full max-w-[210px] lg:w-fit lg:mx-3 px-3 hover:bg-gray-200 text-center rounded-lg text-sm py-2 transition-all text-black hover:text-primary`}>
                        Logout
                    </Menu.Item>
                    <NormalNavLink href={MANAGE_DOCS} text="Manage Docs" focused />
                </>
            }


        </div >
    )
}




const NormalNavLink = ({ href, text, focused, prefetch = false }: { text: string, href: string, focused?: boolean, prefetch?: boolean }) => {
    return (
        <Link prefetch={prefetch} href={href} className="w-full max-w-[210px] lg:w-fit lg:mx-3">
            <Menu.Item as='div' className={`font-medium w-full px-3 hover:bg-gray-200 text-center rounded-lg text-sm py-2 transition-all ${focused ? 'text-white bg-black hover:text-black  border border-black' : 'text-black hover:text-primary'}`}>
                {text}
            </Menu.Item>
        </Link>
    )
}
