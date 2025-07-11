export interface IPost {
  id?: string
  authorId: string
  content: string
  likes: number
  replies: number
  createdAt: Date
  hashtags: string[]
  referenceId?: string
  mediaUrl?: string
}
