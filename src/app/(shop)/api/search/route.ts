import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        { message: "Nenhuma consulta foi fornecida." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findFirst({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Nenhuma categoria encontrada para a consulta fornecida." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { products: category.products ?? [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
