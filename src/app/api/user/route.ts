import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(4, "Username is required").max(20),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .min(1, "Senha é obrigatória"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, password, email } = userSchema.parse(body);

    const userExistsByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExistsByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Usuário com este email já existe.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: "User created succesfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
        message: "Something went wrong!",
      },
      {
        status: 500,
      }
    );
  }
}
