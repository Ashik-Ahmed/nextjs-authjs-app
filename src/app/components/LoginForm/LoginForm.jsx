"use client"

import React, { useState } from 'react'
import SocialLogin from '../SocialLogin/SocialLogin'
import { doCredentialLogin } from '@/app/serverActions/authActions'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const router = useRouter()

    const [loginError, setLoginError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(e.currentTarget)

            const response = await doCredentialLogin(formData);
            console.log(response);

            if (!!response?.error) {
                setLoginError(response?.error?.message)
            }
            else {
                router.push("/home")
            }

        } catch (error) {
            console.log(error);
            setLoginError("Wrong Credentials")
            // throw new Error(error.message)
        }
        setLoading(false)
    }

    return (
        <>
            <div>
                {loginError && <p className='text-red-500'>{loginError}</p>}
            </div>
            <form onSubmit={handleLogin} className='flex flex-col items-start gap-y-2 w-fit mx-auto my-4 border border-gray-300 bg-gray-200 shadow-xl p-4 rounded'>
                <div className='flex gap-x-2 justify-between w-full'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' id='email' placeholder='Email' className='border border-gray-500 rounded mx-2' />
                </div>
                <div className='flex gap-x-2 justify-between w-full'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Password' className='border border-gray-500 rounded mx-2' />
                </div>
                <button type='submit' className='bg-blue-500 text-white p-1 rounded'>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
            <SocialLogin />
        </>
    )
}

export default LoginForm