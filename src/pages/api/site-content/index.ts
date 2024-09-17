import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const siteContent = await prisma.siteContent.findMany()
      res.status(200).json(siteContent)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching site content', error })
    }
  } else if (req.method === 'PUT') {
    if (req.user!.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' })
    }

    try {
      const { key, content } = req.body
      const updatedContent = await prisma.siteContent.upsert({
        where: { key },
        update: { content },
        create: { key, content }
      })
      res.status(200).json(updatedContent)
    } catch (error) {
      res.status(400).json({ message: 'Error updating site content', error })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default authMiddleware(handler)