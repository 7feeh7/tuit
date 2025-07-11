export interface ICreateUserDTO {
  username: string
  displayName: string
  avatarUrl: string
  email?: string
  phoneNumber?: string
  password: string
}
