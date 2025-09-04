"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { logout } from '../../../utils/firebase'
import Image from "next/image";




type NavigationBarProps = {
    role: 'Public' | 'Organisation' | 'Official'
}

export function NavigationBar({ role }: NavigationBarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const Router = useRouter();

    const logedStatus =
        role === "Organisation"
            ? "Log Out"
            : role === "Official"
                ? "Log Out"
                : "Log In"

    function logedFunction() {
        role === "Organisation"
            ? [Router.push("/"), logout()]
            : role === "Official"
                ? [Router.push("/"), logout()]
                : Router.push("/auth/login");
    }


    // Navigation links can change depending on role
    const baseNavigation = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
    ]

    const organisationNav = [
        { name: 'Dashboard', href: '/organisation/dashboard' },
        { name: 'Reports', href: '/organisation/reports' },
    ]

    const officialNav = [
        { name: 'Admin Panel', href: '/official/admin' },
        { name: 'Manage Users', href: '/official/users' },
    ]

    const navigation =
        role === 'Organisation'
            ? [...baseNavigation, ...organisationNav]
            : role === 'Official'
                ? [...baseNavigation, ...officialNav]
                : baseNavigation


    return (
        <div>
            <nav aria-label="Global" style={{ backgroundColor: '#161e32ff', borderBottomLeftRadius: 13, borderBottomRightRadius: 13 }} className="flex items-center justify-between p-6 lg:px-8">

                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image
                            alt="Tailwind CSS logo"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            width={32}
                            height={32}
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button id="navBtn" onClick={() => { logedFunction() }} className="text-sm/6 font-semibold text-white">
                        {logedStatus} <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </nav>



            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>

                            <Image
                                alt="Tailwind CSS logo"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />

                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    id="navBtn"
                                    href="#"
                                    onClick={() => { logedFunction() }}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                >
                                    {logedStatus}
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    )
}