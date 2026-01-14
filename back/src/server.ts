import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apartmentsRouter from './routes/apartments.routes';
import authRouter from './routes/auth.routes';
import session from 'express-session'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || '';


app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/apartments', apartmentsRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
