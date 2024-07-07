export class LoginUserDto {
  constructor(
      public email: string,
      public password: string
  ) {
  }

  static create(object: { email: string, password: string }): [string?, LoginUserDto?] {

    const {email, password} = object;

    if (!email) return ['Missing email'];
    if (!password) return ['Missing password'];

    return ['', new LoginUserDto(email, password)]


  }
}