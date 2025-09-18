import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'changeme';
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
