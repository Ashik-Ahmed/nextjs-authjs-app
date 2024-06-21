import { auth } from '@/auth'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
import Logout from '../components/Logout/Logout';

const HomePage = async () => {

    const session = await auth();

    if (!session?.user) {
        redirect('/auth/signin')
    }

    return (
        <div className='text-center flex flex-col items-center justify-center'>
            <div>This is HomePage</div>
            {
                session?.user?.image && session?.user?.name ? (
                    <>
                        <h1>Welcome, {session?.user?.name}</h1>

                        <Image src={session?.user?.image} alt={session?.user?.name} width={150} height={200}
                            className='my-4 rounded shadow-2xl shadow-gray-500 w-[150px] h-[200px]' />
                    </>
                ) : (
                    <>
                        <p>Welcome, </p>
                        <p>{session?.user?.email}</p>
                    </>
                )
            }

            <Logout />
        </div>
    )
}

export default HomePage