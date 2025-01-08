import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/users";
import { connectToDB } from "@utils/db";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async session({ session }) {
            try {
                await connectToDB();
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session;
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile.email });

                if (userExists) {
                    userExists.lastLoggedIn = new Date();
                    await userExists.save();
                } else {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                        role: 'user',
                        createdOn: new Date(),
                        lastLoggedIn: new Date(),
                    });
                }

                return true;
            } catch (error) {
                console.error("Error in sign-in callback:", error);
                return false;
            }
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
