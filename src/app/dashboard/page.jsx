"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {

    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p>You are not logged in</p>
    }

    return (
        <>
            <div>Dashboard</div>
            <p>{session?.user?.email}</p>
        </>
    )
}

export default Dashboard