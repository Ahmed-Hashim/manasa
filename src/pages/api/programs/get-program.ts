import {  NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware';

const prisma = new PrismaClient();

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Fetch the first program of the user, sorted by creation date
      const firstProgram = await prisma.program.findFirst({
        where: { userId: userId },
        orderBy: { createdAt: 'asc' }, // Ensure 'createdAt' exists in your Prisma schema
      });

      if (!firstProgram) {
        return res.status(404).json({ message: 'No programs found for this user' });
      }

      res.status(200).json(firstProgram);
    } catch (error) {
      console.error('Error fetching first program:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default authMiddleware(handler);