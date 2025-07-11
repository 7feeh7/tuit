import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUserDocument extends Document {
  _id: Types.ObjectId
  username: string
  displayName: string
  avatarUrl: string
  email?: string
  phoneNumber?: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  avatarUrl: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema)
