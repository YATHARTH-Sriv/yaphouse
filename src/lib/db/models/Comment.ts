import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  podcastId: mongoose.Types.ObjectId;
  username: string;
  content: string;
  createdAt: Date;
}

const CommentSchema = new Schema({
  podcastId: { type: Schema.Types.ObjectId, ref: 'Podcast', required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);