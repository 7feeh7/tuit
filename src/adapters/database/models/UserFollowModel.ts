import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUserFollowDocument extends Document {
  followerId: Types.ObjectId
  followingId: Types.ObjectId
  createdAt: Date
}

const UserFollowSchema = new Schema<IUserFollowDocument>({
  followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followingId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

export const UserFollowModel = mongoose
  .model<IUserFollowDocument>('UserFollow', UserFollowSchema)
