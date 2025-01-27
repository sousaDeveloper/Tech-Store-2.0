import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { favorite } = await req.json();
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { message: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    if (favorite) {
      await prisma.favorite.create({
        data: {
          productId: id,
          userId: session.user.id,
        },
      });
    } else {
      await prisma.favorite.deleteMany({
        where: {
          userId: session.user.id,
          productId: id,
        },
      });
    }

    return NextResponse.json({ message: "Favorite updated successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar o produto.", error: error },
      { status: 500 }
    );
  }
}
