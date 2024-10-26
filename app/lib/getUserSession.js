import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user || null;
};
