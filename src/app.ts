import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	import('./routes/index.js').then((mod) => app.use('/prod', mod.default));
} else {
	import('./routes/index.js').then((mod) => app.use('/dev', mod.default));
}

export default app;
