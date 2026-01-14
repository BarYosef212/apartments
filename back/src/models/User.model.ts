import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../types/models.types';

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });



export const User = mongoose.model<UserDocument>('users', UserSchema);
