import mongoose, { Schema, Document } from 'mongoose'

export interface IPostDocument extends Document {
  _id: string
  authorId: string
  content: string
  likes: number
  replies: number
  createdAt: Date
  hashtags: string[]
  referenceId?: string
  mediaUrl?: string
}

const PostSchema = new Schema<IPostDocument>({
  authorId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String }],
  referenceId: { type: String },
  mediaUrl: { type: String }
})

export const PostModel = mongoose.model<IPostDocument>('Post', PostSchema)
