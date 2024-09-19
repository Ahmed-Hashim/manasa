import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthenticatedRequest } from '../../../lib/authMiddleware';

import path from 'path';
import fs from 'fs';
import formidable, { Fields, Files, File } from 'formidable';

const prisma = new PrismaClient();

export const config = { 
  api: {
    bodyParser: false,
  },
};

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    console.log('Received PUT request');
    
    const form = formidable({
      uploadDir: path.join(process.cwd(), '/public/profileimages'),
      keepExtensions: true,
      maxFileSize: 25 * 1024 * 1024, // 25 MB
    });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      console.log('Inside form.parse callback');
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(400).json({ message: 'Error parsing form data', error: err.message });
      }

      console.log('Form parsed successfully');
      console.log('Fields:', fields);
      console.log('Files:', files);

      const { userId, name, email, bio, party } = fields;
      const imageFile = files.image as File | File[];

      const getFilePath = (fileOrFiles: File | File[] | undefined): string | null => {
        if (Array.isArray(fileOrFiles)) return fileOrFiles[0]?.filepath || null;
        return fileOrFiles?.filepath || null;
      };

      const imagePath = getFilePath(imageFile);

      if (imagePath && !fs.existsSync(imagePath)) {
        console.error('Image file does not exist:', imagePath);
        return res.status(400).json({ message: 'Image file does not exist', path: imagePath });
      }

      const profileData = {
        name: name?.toString() || '',
        email: email?.toString() || '',
        bio: bio?.toString() || '',
        party: party?.toString() || '',
        image: imagePath ? path.relative(process.cwd(), imagePath) : undefined,
      };

      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId?.toString() },
          data: {
            name: profileData.name,
            email: profileData.email,
          },
        });

        const updatedProfile = await prisma.profile.update({
          where: { userId: userId?.toString() },
          data: {
            bio: profileData.bio,
            partyName: profileData.party,
            imageUrl: profileData.image,
          },
        });

        console.log('User and profile updated successfully');
        return res.status(200).json({ ...updatedUser, profile: updatedProfile });
      } catch (error) {
        console.error('Error updating user or profile:', error);
        return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
      }
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default authMiddleware(handler);