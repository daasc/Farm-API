import type { Admin } from '@prisma/client';
export type FarmType = 'CRIA' | 'RECRIA' | 'ENGORDA' | 'CICLO_COMPLETO';

export interface FarmData {
  id?: string;
  name: string;
  location: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  adminId: string;
  types: FarmType[];
  active?: boolean;
  admin?: Admin;
}

export interface FarmInput {
  name: string;
  location: string;
  email: string;
  password: string;
  adminId: string;
  types: FarmType[];
  active?: boolean;
}
