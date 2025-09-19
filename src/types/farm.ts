import type { Admin } from '@prisma/client';

export interface FarmData {
  id?: string;
  name: string;
  location: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  adminId: string;
  admin?: Admin;
}

export interface FarmInput {
  name: string;
  location: string;
  email: string;
  password: string;
  adminId: string;
}
