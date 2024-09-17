import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const { programId, status, comment } = req.body
    const updatedProgram = await prisma.program.update({
      where: { id: programId },
      data: { 
        status,
        comments: {
          create: {
            content: comment,
            userId: req.user!.userId
          }
        }
      }
    })
    res.status(200).json(updatedProgram)
  } catch (error) {
    res.status(400).json({ message: 'Error reviewing program', error })
  }
}

export default authMiddleware(handler)