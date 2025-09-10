"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { logout, login } from '../../../utils/firebase'
import Image from "next/image";
import {
    Menu, X, Sun, Moon, Shield,

} from 'lucide-react';




type NavigationBarProps = {
    role: "Public" | "Organisation" | "Official";
    onDarkModeChange?: (value: boolean) => void;
};

export function NavigationBar({ role, onDarkModeChange }: NavigationBarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const Router = useRouter();
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        if (onDarkModeChange) {
            onDarkModeChange(darkMode);
        }
    }, [darkMode, onDarkModeChange]);


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
        { name: 'Home', href: '#home' },
        { name: 'Diseases', href: '#diseases' },
        { name: 'Reports', href: '#reports' },
        { name: 'Statistics', href: '#statistics' },
        { name: 'Contact', href: '#contact' },
    ]

    const organisationNav = [
        { name: 'Dashboard', href: '#' },
        { name: 'Reports', href: '#' },
    ]

    const officialNav = [
        { name: 'Admin Panel', href: '#' },
        { name: 'Manage Users', href: '#' },
    ]

    const navigation =
        role === 'Organisation'
            ? [ ...organisationNav]
            : role === 'Official'
                ? [ ...officialNav]
                : baseNavigation


    return (
        <div>
            <nav className={`sticky top-0 z-40 backdrop-blur-sm ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} border-b border-gray-200 dark:border-gray-700`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <Shield className="w-8 h-8 text-blue-500" />
                            <span className="font-bold text-xl">HealthGuard</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className={`${darkMode ? 'text-white/90' : 'text-gray-900/90'}  hover:text-blue-500 transition-colors`}>
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <button id="navBtn" onClick={() => { logedFunction() }} className="text-sm/6 font-semibold text-white">
                                    {logedStatus} <span aria-hidden="true">&rarr;</span>
                                </button>
                            </div>

                            <button
                                className="md:hidden p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>



            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Shield className="w-8 h-8 text-blue-500" />
                            <span className={`font-bold ${darkMode ? 'text-gray-100 hover:text-gray-200' : 'text-gray-800 hover:text-gray-700'} text-xl`}>HealthGuard</span>
                        </div>

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
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        key={item.name}
                                        href={item.href}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${darkMode ? 'text-gray-100 hover:text-gray-200' : 'text-gray-800 hover:text-gray-700'}`}
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