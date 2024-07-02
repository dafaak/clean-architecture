export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public roles: string[];
  public img?: string;

  constructor(
      params: {
        id: string,
        name: string,
        email: string,
        password: string,
        roles: string[],
        img?: string,
      }
  ) {
    this.id = params.id;
    this.name = params.name
    this.email = params.email
    this.password = params.password
    this.roles = params.roles
    this.img = params.img
  }
}