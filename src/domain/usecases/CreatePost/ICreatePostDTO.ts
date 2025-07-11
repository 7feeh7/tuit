export interface ICreatePostDTO {
  authorId: string
  content: string
  hashtags?: string[]
  referenceId?: string
  mediaUrl?: string
}
