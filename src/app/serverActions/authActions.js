"use server"

import { signIn, signOut } from "@/auth";


export async function doSocialLogin(formData) {
    const action = formData.get('action')
    console.log(action);
    await signIn(action, { redirectTo: "/home" })
}

export async function doLogout() {
    await signOut({ redirectTo: "/" })
}

export async function doCredentialLogin(formData) {
    try {
        const email = formData.get('email')
        const password = formData.get('password')
        const response = await signIn("credentials", { email, password, redirect: false })

        return response;

    } catch (error) {
        throw new Error(error)
    }
}