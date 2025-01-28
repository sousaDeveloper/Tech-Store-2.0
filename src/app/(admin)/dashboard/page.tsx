import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user || user.TypeUser !== "ADMIN") {
    redirect("/");
  }

  return (
    <main>
      <h1>Painel de Admin</h1>
    </main>
  );
}
