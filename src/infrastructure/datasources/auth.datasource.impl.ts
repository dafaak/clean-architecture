import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDataSource {

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const {name, email, password} = registerUserDto;

    try {
      // 1. verificar si el correo existe
      // 2. hash de la contrasena
      // 3. Mapear la respuesta a la entidad

      return new UserEntity('1', 'test', 'test@mail.com', '123456', ['test'])
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer()

    }
  }

}