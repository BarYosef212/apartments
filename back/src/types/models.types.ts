import { Document } from 'mongoose';

export interface ApartmentDocument extends Document {
  img?: string;
  price: number;
  street: string;
  city: string;
  type: string;
  info?: string;
  rooms?: number;
  floor?: number;
  size?: number;
  tags?: string[];
  premium?:boolean,
  embedding?: number[] | undefined;
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: 'admin';
}
