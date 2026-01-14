import mongoose, { Schema } from 'mongoose';
import { ApartmentDocument } from '../types/models.types';

const ApartmentSchema = new Schema<ApartmentDocument>(
  {
    img: { type: String, required: false, trim: true },
    price: { type: Number, required: true, index: true },
    street: { type: String, required: true, trim: true, index: true },
    city: { type: String, required: true, trim: true, index: true },
    type: { type: String, required: true, trim: true, index: true },
    info: { type: String, required: false, trim: true },
    rooms: { type: Number, required: false, index: true },
    floor: { type: Number, required: false },
    size: { type: Number, required: false },
    tags: { type: [String], default: [] },
    premium: {type:Boolean,required:false},
    embedding: { type: [Number], required: false },
  },
  { timestamps: true }
);


export const Apartment = mongoose.model<ApartmentDocument>('apartments', ApartmentSchema);