import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { client } from "/utils/sanity";

const options = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // SanityCredentials(client),
  ],
  page: {
    signin:"/auth/signin"
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SanityAdapter(client),
};

export default NextAuth(options);
