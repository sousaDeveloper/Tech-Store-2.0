import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query) {
      return NextResponse.json(
        { message: "No query provided" },
        { status: 400 }
      );
    }

    const categories = await prisma.category.findMany({
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

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ categories, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
