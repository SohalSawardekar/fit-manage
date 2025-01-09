import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/users";
import { connectToDB } from "@utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Connect to the database
          await connectToDB();

          // Find user by email
          const existingUser = await User.findOne({ email: credentials.email });

          if (existingUser) {
            // Verify the provided password
            const isValidPassword = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );

            if (isValidPassword) {
              // Return user object
              return {
                id: existingUser._id.toString(),
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role,
                loginType: existingUser.loginType,
              };
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          throw new Error("Authentication failed. Please check your credentials.");
        }
      },
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
          session.user.loginType = sessionUser.loginType;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async signIn({ account, profile, user }) {
      try {
        await connectToDB();

        // Handle Google sign-in
        if (account.provider === "google") {
          const userExists = await User.findOne({ email: profile.email });

          if (userExists) {
            // Update lastLoggedIn timestamp
            userExists.lastLoggedIn = new Date();
            await userExists.save();
          } else {
            // Create a new user for Google sign-in
            console.log("Creating a new Google user");
            await User.create({
              name: profile.name,
              email: profile.email,
              googleId: profile.sub,
              image: profile.picture,
              role: "user",
              loginType: "Google",
              age: 0,
              gender: "male",
              contactNo: "",
              dateJoined: new Date(),
              lastLoggedIn: new Date(),
            });
          }
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
