import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { compare } from "bcrypt";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/user/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existsUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { Favorite: true },
        });

        if (!existsUser) {
          return null;
        }

        if (existsUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existsUser.password
          );
          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: `${existsUser.id}`,
          name: existsUser.name || "",
          email: existsUser.email,
          favorites: existsUser.Favorite.map((fav) => fav.productId),
        };
      },
    }),
  ],
  callbacks: {
    // Callback de session para incluir os favoritos na sessão
    async session({ session, token }) {
      // Se o token contiver o id do usuário, podemos buscar seus favoritos
      if (token?.id) {
        const favorites = await prisma.favorite.findMany({
          where: { userId: token.id },
          select: { productId: true },
        });

        // Adicionando os favoritos à sessão
        session.user.favorites = favorites.map((fav) => fav.productId);
      }

      return {
        ...session,
        user: {
          id: token.id ?? "",
          name: token.name ?? "",
          email: token.email ?? "",
          favorites: session.user.favorites ?? [], // Adiciona favoritos se existir
        },
      };
    },

    // Callback de JWT para incluir o id do usuário no token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
