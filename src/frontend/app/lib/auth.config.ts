import { NextAuthConfig } from "next-auth"
import { NextResponse } from "next/server";


export const authConfig = {
    providers: [],
    pages: {
        signIn: '/'
    },
    callbacks: {

        jwt: async ({ token, user, trigger, session }) => {
            if (trigger === "signIn") {

                user && (token.user = user)

                return token

            }
            if (trigger === "update" && session) {
                token.user = session.user
                return { ...token, ...session.user }
            }
            return token
        },
        session: async ({ session, token }: any) => {
            session.user = token.user


            return session
        },
        authorized: async ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            const session = auth?.user

            // console.log({isLoggedIn})
            // console.log({session})

            const isOnLoginPage = nextUrl.pathname.startsWith("/");
            const isOnHomePage = nextUrl.pathname.startsWith('/home');

            if (!isLoggedIn) return false

            if (isOnLoginPage && isLoggedIn && !isOnHomePage) {
                return NextResponse.redirect(new URL("/home", nextUrl));
            }
           

            return true
        },

    }
} satisfies NextAuthConfig;




