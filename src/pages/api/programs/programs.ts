import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import formidable, { Fields, Files, File } from 'formidable';
import path from 'path';
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware';
import fs from 'fs';

const prisma = new PrismaClient();

// Disable the default body parser
export const config = { 
  api: {
    bodyParser: false,
  },
};

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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

      // Log the user object to debug
      console.log('Authenticated user:', req.user);

      // Construct program data object
      const programData = {
        candidateName: candidateName?.toString() || '',
        partyName: partyName?.toString() || '',
        programDetails: programDetails?.toString() || '',
        vision: vision?.toString() || '',
        goals: goals?.toString() || '',
        priorities: priorities?.toString() || '',
        kpis: kpis?.toString() || '',
        collaboration: collaboration?.toString() || '',
        trackingMechanism: trackingMechanism?.toString() || '',
        proposedPrograms: proposedPrograms?.toString() || '',
        age: age ? parseInt(age.toString(), 10) : undefined,
        educationLevel: educationLevel?.toString() || '',
        image: imagePath ? path.relative(process.cwd(), imagePath) : undefined,
        cv: cvPath ? path.relative(process.cwd(), cvPath) : undefined,
        educationCertificate: educationCertificatePath ? path.relative(process.cwd(), educationCertificatePath) : undefined,
        userId: req.user?.userId,  // Ensure this ID exists in the User table
      };

      try {
        // Check if user exists
        const user = await prisma.user.findUnique({
          where: { id: programData.userId },
        });

        if (!user) {
          return res.status(400).json({ message: 'User does not exist', userId: programData.userId });
        }

        // Check if the user already has a program
        const existingProgram = await prisma.program.findFirst({
          where: { userId: programData.userId },
        });

        if (existingProgram) {
          return res.status(400).json({ message: 'User already has a program', userId: programData.userId });
        }

        // Create the program
        const program = await prisma.program.create({
          data: programData,
        });
        res.status(201).json(program);
      } catch (error) {
        console.error('Error creating program:', error);
        res.status(400).json({ message: 'Error creating program', error: (error as Error).message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default authMiddleware(handler);
