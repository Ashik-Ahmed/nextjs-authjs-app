import { doSocialLogin } from '@/app/serverActions/authActions'
import React from 'react'

const SocialLogin = () => {
    return (
        <form action={doSocialLogin} className='flex gap-x-2 justify-center'>
            <button
                className='bg-green-500 text-white p-2 rounded text-lg'
                type='submit' name='action' value='google'>
                Login with Google
            </button>
            <button
                className='bg-black text-white p-2 rounded text-lg'
                type='submit' name='action' value='github'>
                Login with Github
            </button>
        </form>
    )
}

export default SocialLogin