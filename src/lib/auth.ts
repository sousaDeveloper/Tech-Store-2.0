import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

import { prisma } from "./prisma";
import { compare } from "bcrypt";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/user/sign-in", // Página de login personalizada
  },
  session: {
    strategy: "jwt", // Estratégia JWT
  },
  adapter: PrismaAdapter(prisma) as Adapter, // Adaptador Prisma para integração com o banco de dados
  providers: [
    // Provedor Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Provedor de credenciais (email e senha)
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

        // Verificando se o usuário existe no banco de dados
        const existsUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existsUser) {
          return null; // Usuário não encontrado
        }

        // Verificando a senha
        const passwordMatch = await compare(
          credentials.password,
          existsUser.password
        );
        if (!passwordMatch) {
          return null; // Senha incorreta
        }

        // Garantindo que o nome não seja nulo
        return {
          id: `${existsUser.id}`,
          name: existsUser.name || "", // Caso name seja null, retorna uma string vazia
          email: existsUser.email,
        };
      },
    }),
  ],
  callbacks: {
    // Ajustando os dados que ficam disponíveis na sessão do usuário
    async session({ session, user }) {
      return {
        ...session,
        user: {
          id: user?.id ?? "", // Garantindo que o ID do usuário esteja presente
          name: user?.name ?? "",
          email: user?.email ?? "",
        },
      };
    },

    // Modificando o JWT para adicionar dados do usuário
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para assinatura do token
};
