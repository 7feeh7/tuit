export interface IUser {
  id?: string
  username: string
  displayName: string
  avatarUrl: string
  email?: string
  phoneNumber?: string
  password: string
  createdAt: Date
  updatedAt: Date
}