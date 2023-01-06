import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseClient";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // log in with email and password from firebase
        const user = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        ).catch((err) => {
          if (err.code === "auth/user-not-found") {
            alert("User not found");
          } else if (err.code === "auth/wrong-password") {
            alert("Wrong password");
          } else {
            alert("Something went wrong");
          }
        });

        if (user) {
          const { email, uid } = user.user;
          return { email, uid };
        }
      },
    }),
  ],
  secret: "bNgOZ0ZnoZEo+k+uZp3qqTSJioRdIQZqfqXdQVQDfEg=",
});
