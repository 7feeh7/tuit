import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  const MONGO_URI = process.env.MONGODB_URI

  if (!MONGO_URI) {
    throw new Error('MONGODB_URI not set.')
  }

  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}