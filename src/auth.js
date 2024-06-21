import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/users";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // try {
                //     const user = getUserByEmail(credentials?.email);
                //     if (user) {
                //         const isPasswordMatch = user.password === credentials.password;
                //         if (isPasswordMatch) {
                //             return user
                //         }
                //         else {
                //             throw new Error("Wrong password")
                //         }
                //     }
                //     else {
                //         throw new Error("User not found")
                //     }
                // } catch (error) {
                //     throw new Error(error)
                // }

                const { email, password } = credentials;
                try {
                    const res = await fetch('http://localhost:5000/api/v1/employee/login', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    })
                    const data = await res.json();

                    if (data?.status == "Success") {
                        // return data.data.employee;
                        console.log("db employee: ", data?.data?.employee);
                        const employee = data?.data?.employee;
                        return employee;
                    }
                    else {
                        return null;
                    }

                } catch (error) {
                    // console.log(error);
                    return error;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    secret: process.env.AUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
    callbacks: {
        jwt: async ({ token, user }) => {
            // console.log("inside jwt user: ", user);
            // console.log("inside jwt token: ", token);
            if (user) {
                token.role = user.userRole;
                token._id = user._id;
                token.department = user.department
                token.accessToken = user.accessToken
            }
            return token;
        },
        session: async ({ session, token }) => {
            // console.log("user is: ", session?.user);
            // console.log("token is: ", token);
            if (session?.user) {
                session.user.role = token.role;
                session.user._id = token._id;
                session.user.department = token.department
                session.user.accessToken = token.accessToken
            }
            console.log("session is: ", session);
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60, // 8 hours
    }
})