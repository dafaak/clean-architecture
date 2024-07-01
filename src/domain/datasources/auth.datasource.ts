import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthDataSource {
  // sirve para definir reglas
  // abstract login()

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}