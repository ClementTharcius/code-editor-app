import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { 
	JWT_SECRET,
	MONGODB_URI,
	PORT
} = process.env;
