import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  imageUrl: string;
  techStack: string[];
  category: 'Graphic Design' | 'System Development';
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the project'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  techStack: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: ['Graphic Design', 'System Development'],
    required: [true, 'Please select a category'],
  },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
