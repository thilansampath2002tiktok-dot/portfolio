import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  category: 'Graphic Design' | 'System Development';
  imageUrl?: string;
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the service'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    enum: ['Graphic Design', 'System Development'],
    required: [true, 'Please select a category'],
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
