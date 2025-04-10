import mongoose, { Schema, Document } from 'mongoose';

export interface IPodcast extends Document {
  title: string;
  description: string;
  audioUrl: string;
  thumbnailUrl: string; // Added field for thumbnail
  createdAt: Date;
  updatedAt: Date;
}

const PodcastSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audioUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true }, // Added field for thumbnail
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'podcasts' // Explicitly set collection name
});

// Use this pattern to prevent model compilation errors
const Podcast = mongoose.models.Podcast || mongoose.model<IPodcast>('Podcast', PodcastSchema);

export default Podcast;