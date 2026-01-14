import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import {
  JWT_DEFAULT_EXPIRES_IN,
} from '../config/constants';
import dotenv from 'dotenv';
dotenv.config({ debug: false });

const JWT_SECRET = process.env.JWT_SECRET || ''
const JWT_EXPIRES_IN = JWT_DEFAULT_EXPIRES_IN;

export async function validateUserCredentials(email: string, password: string) {
  const user = await User.findOne({ email }).lean();
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: String(user._id),
      email: user.email,
      role: user.role,
    },
  };
}
