import { findUserInDataBase } from "@/app/lib/data";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          image: profile.avatar_url,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) {
          return false;
        }

        const findUser = await findUserInDataBase(user.email, account);

        if (findUser) {
          await sql`
          UPDATE users
          SET provider = ${account?.provider}, provider_id = ${account?.providerAccountId}
          WHERE id = ${findUser.id}
          `;

          return true;
        }

        console.log("СОЗДАЕТСЯ НОВЫЙ ПОЛЬЗОВАТЕЛЙ");
        await sql`
          INSERT INTO users (id, name, email, provider, provider_id, create_date)
          VALUES (${uuidv4()}, ${user.name || "User#" + user.id}, ${
          user.email
        }, ${account?.provider}, ${account?.providerAccountId}, ${new Date()})
        `;

        return true;
      } catch (error) {
        console.error("Error signIn", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
