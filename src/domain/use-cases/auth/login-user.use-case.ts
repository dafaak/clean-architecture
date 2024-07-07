import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";
import { JwtAdapter } from "../../../config";

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

type GenerateTokenFunction = (payload: Object, duration: string) => Promise<string | null>;

type CompareFunction = (password: string, hashed: string) => boolean;

export class LoginUser implements LoginUserUseCase {

  constructor(
      private readonly authRepository: AuthRepository,
      private readonly generateTokenFunction: GenerateTokenFunction = JwtAdapter.generateToken
  ) {
  }

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);

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