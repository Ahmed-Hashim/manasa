import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable, { Fields, Files, File } from 'formidable';
import path from 'path';
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware';
import fs from 'fs';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Disable the default body parser
export const config = { 
  api: {
    bodyParser: false,
  },
};

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/uploads'),
      keepExtensions: true,
      maxFileSize: 25 * 1024 * 1024, // 25 MB
    });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(400).json({ message: 'Error parsing form data', error: err.message });
      }

      const {
        id,
        candidateName,
        partyName,
        programDetails,
        vision,
        goals,
        priorities,
        kpis,
        collaboration,
        trackingMechanism,
        proposedPrograms,
        age,
        educationLevel
      } = fields;

      const getFilePath = (fileOrFiles: File | File[] | undefined): string | null => {
        if (Array.isArray(fileOrFiles)) return fileOrFiles[0]?.filepath || null;
        return fileOrFiles?.filepath || null;
      };

      const imagePath = getFilePath(files.image);
      const cvPath = getFilePath(files.cv);
      const educationCertificatePath = getFilePath(files.educationCertificate);

      // Validate file existence
      if (imagePath && !fs.existsSync(imagePath)) {
        console.error('Image file does not exist:', imagePath);
        return res.status(400).json({ message: 'Image file does not exist', path: imagePath });
      }
      if (cvPath && !fs.existsSync(cvPath)) {
        console.error('CV file does not exist:', cvPath);
        return res.status(400).json({ message: 'CV file does not exist', path: cvPath });
      }
      if (educationCertificatePath && !fs.existsSync(educationCertificatePath)) {
        console.error('Education certificate file does not exist:', educationCertificatePath);
        return res.status(400).json({ message: 'Education certificate file does not exist', path: educationCertificatePath });
      }

      // Construct program data object
      const programData: Prisma.ProgramUpdateInput = {
        candidateName: candidateName?.toString() || undefined,
        partyName: partyName?.toString() || undefined,
        programDetails: programDetails?.toString() || undefined,
        vision: vision?.toString() || undefined,
        goals: goals?.toString() || undefined,
        priorities: priorities?.toString() || undefined,
        kpis: kpis?.toString() || undefined,
        collaboration: collaboration?.toString() || undefined,
        trackingMechanism: trackingMechanism?.toString() || undefined,
        proposedPrograms: proposedPrograms?.toString() || undefined,
        age: age ? parseInt(age.toString(), 10) : undefined,
        educationLevel: educationLevel?.toString() || undefined,
      };

      if (imagePath) {
        programData.image = path.relative(process.cwd(), imagePath);
      }
      if (cvPath) {
        programData.cv = path.relative(process.cwd(), cvPath);
      }
      if (educationCertificatePath) {
        programData.educationCertificate = path.relative(process.cwd(), educationCertificatePath);
      }

      try {
        // Check if program exists and belongs to the user
        const existingProgram = await prisma.program.findFirst({
          where: { 
            id: id?.toString(),
            userId: req.user?.userId
          },
        });

        if (!existingProgram) {
          return res.status(404).json({ message: 'Program not found or you do not have permission to edit it' });
        }

        // Update the program
        const updatedProgram = await prisma.program.update({
          where: { id: id?.toString() },
          data: programData,
        });

        res.status(200).json(updatedProgram);
      } catch (error) {
        console.error('Error updating program:', error);
        res.status(400).json({ message: 'Error updating program', error: (error as Error).message });
      }
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default authMiddleware(handler);
