import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    try {
      const programs = await prisma.program.findMany()
      console.log("hello");
      
      res.status(200).json(programs)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching programs', error })
    }

}

export default authMiddleware(handler)