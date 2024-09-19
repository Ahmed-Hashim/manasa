import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  authMiddleware,
  AuthenticatedRequest,
} from "../../../lib/authMiddleware";

const prisma = new PrismaClient();

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId as string },
        // include: { programs: true },
      });

      const profile = await prisma.profile.findUnique({
        where: { userId: userId as string },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ ...user, ...profile });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default authMiddleware(handler);
