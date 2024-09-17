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
    id: string
    title: string
    description: string
    userId: string
    status: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface User {
    id: string
    email: string
    name?: string
    role: string
    profile?: Profile
    programs: Program[]
    comments: Comment[]
    createdAt: Date
    updatedAt: Date
  }
  