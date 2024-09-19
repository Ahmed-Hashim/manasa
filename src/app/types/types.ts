// types.ts
export interface Profile {
    id: string
    userId: string
    bio?: string
    partyName?: string
    imageUrl?: string
    phoneNumber?: string
    address?: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface Program {
    id: string;
    candidateName?: string;
    partyName?: string;
    age?: number;
    educationLevel?: string;
    programDetails?: string;
    vision?: string;
    goals?: string;
    priorities?: string;
    kpis?: string;
    collaboration?: string;
    trackingMechanism?: string;
    proposedPrograms?: string;
    image?: string;
    cv?: string;
    educationCertificate?: string;
    userId: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
    user?: {
      name: string;
    };
  }
  
  export interface User {
    id: string
    imageUrl:string
    email: string
    name?: string
    role: string
    profile?: Profile
    programs: Program[]
    comments: Comment[]
    createdAt: Date
    updatedAt: Date
  }
