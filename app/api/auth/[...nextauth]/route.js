import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/users";
import { connectToDB } from "@utils/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
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
              // Return user object, this will be used to create the JWT token
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
          throw new Error(
            "Authentication failed. Please check your credentials."
          );
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    // JWT callback - Used to create and modify the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;

        await connectToDB();
        const existingUser = await User.findOne({ email: token.email });
        if (existingUser) {
          token.id = existingUser._id.toString();
          token.name = existingUser.name;
          token.role = existingUser.role;
          token.loginType = existingUser.loginType;
        }
      }
      return token;
    },

    // Session callback - Used to modify the session object that is returned to the client
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.loginType = token.loginType;
      return session;
    },

    // Sign-in callback - Handle Google sign-in and user creation
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
              DOB: new Date(),
              age: -1,
              gender: "male",
              contactNo: null,
              paid: false,
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
