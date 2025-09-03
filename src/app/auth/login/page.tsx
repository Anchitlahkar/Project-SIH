"use client"

import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "../../../../utils/firebase";
import Image from "next/image";
import Swal from "sweetalert2"


export default function LoginPage() {
    const router = useRouter();

    const [id, setid] = useState("")
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("password");

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)

            setTimeout(() => {
                router.push("/" + role);
            }, 1500)
        }
    })


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        var email

        (id !== "admin") ? email = id + `@${role}.com` : email = id + `@gmail.com`

        try {
            await login(email, password);
            Toast.fire({
                icon: 'success',
                title: 'Logged In Successfully'
            })
        }


        catch (err: unknown) {
            if (err instanceof FirebaseError) {
                Swal.fire(
                    "Invalid Credentials",
                    "Please Check your Credentials",
                    'error'
                )
            } else {
                Swal.fire(
                    "An unexpected error occurred",
                    'Please try after sometime',
                    'error'
                )
                console.log(err)
            }
        }
    };


    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Login</h2>
                </div>



                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form action="#" method="POST" className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Your Role:
                            </label>
                            <div className="mt-2">
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                >
                                    <option value="" disabled>
                                        Select Login method
                                    </option>
                                    <option style={{ color: "#000" }} value="organization">Organisation</option>
                                    <option style={{ color: "#000" }} value="official">Official</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="id" className="block text-sm/6 font-medium text-gray-100">
                                ID:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="id"
                                    name="id"
                                    type="id"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    onChange={(e) => setid(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((showPassword == "password" ? "text" : "password"))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <Image
                                        src={showPassword == "password" ? "/show.png" : "/hide.png"}
                                        alt="Toggle password visibility"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}