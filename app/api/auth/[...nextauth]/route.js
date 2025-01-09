import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/users";
import { connectToDB } from "@utils/db";
import CredentialsProvider from "@node_modules/next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
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
          session.user.role = sessionUser.role;
          session.user.loginType = sessionUser.loginType; // Include loginType in the session
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

        // Check if the user exists
        const userExists = await User.findOne({ email: profile.email });

        if (userExists) {
          // Update lastLoggedIn timestamp
          userExists.lastLoggedIn = new Date();
          await userExists.save();
        } else {
          // Create a new user
          console.log("Creating a new Google user");
          await User.create({
            name: profile.name,
            email: profile.email,
            password: null, 
            googleId: profile.sub,
            image: profile.picture,
            role: "user", 
            loginType: "Google",
            age: 0,
            gender: 'male',
            contactNo: '', 
            dateJoined: new Date(),
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
