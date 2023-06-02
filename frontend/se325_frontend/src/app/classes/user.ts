export class User {
  userId: number
  firstName: string
  lastName: string
  username: string
  password?: string
}

export class RegisterUserDTO {
  firstName: string
  lastName: string
  username: string
  password: string
}

export class LoginUserDTO {
  username: string
  password: string
}
