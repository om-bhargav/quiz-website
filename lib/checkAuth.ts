import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "./prisma";

export async function checkAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return null;
  }

  return session.user;
}

export async function checkUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const userId = session.user?.id;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || user.status === "SUSPENDED") {
    return null;
  }

  return user.id;
}