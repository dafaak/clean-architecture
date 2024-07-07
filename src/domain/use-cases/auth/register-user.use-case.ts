import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type GenerateTokenFunction = (payload: Object, duration: string) => Promise<string | null>;

export class RegisterUser implements RegisterUserUseCase {

  constructor(
      private readonly authRepository: AuthRepository,
      private readonly generateTokenFunction: GenerateTokenFunction = JwtAdapter.generateToken
  ) {
  }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

    const user = await this.authRepository.register(registerUserDto);

    const token = await this.generateTokenFunction({id: user.id}, '2h');

    if (!token) throw CustomError.internalServer('Error generating JWT');

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}