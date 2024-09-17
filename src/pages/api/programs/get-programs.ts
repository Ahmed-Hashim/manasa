import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const programs = await prisma.program.findMany({
        include: { user: { select: { name: true } } }
      })
      res.status(200).json(programs)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching programs', error })
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description } = req.body
      const program = await prisma.program.create({
        data: {
          title,
          description,
          userId: req.user!.userId
        }
      })
      res.status(201).json(program)
    } catch (error) {
      res.status(400).json({ message: 'Error creating program', error })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default authMiddleware(handler)