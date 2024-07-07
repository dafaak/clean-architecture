import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data/mongodb";
import { BcryptAdapter } from "../../config";
import { UsserMapper } from "../mappers/usser.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
type MapperFunction = (object: { [key: string]: any }) => UserEntity;

export class AuthMongoDatasource implements AuthDataSource {

  constructor(
      private readonly hashPassword: HashFunction = BcryptAdapter.hash,
      private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
      private readonly userMapper: MapperFunction = UsserMapper.userEntityFromObject
  ) {

  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {


    const {name, email, password} = registerUserDto;

    try {

      // 1. verificar si el correo existe
      const exists = await UserModel.findOne({email: email});
      if (exists) throw CustomError.badRequest('Verify your credentials');

      const user = await UserModel.create({
        name,
        email,
        // 2. hash de la contrasena
        password: this.hashPassword(password)
      })


      await user.save();
      // 3. Mapear la respuesta a la entidad
      return this.userMapper(user);

    } catch (error) {

      if (error instanceof CustomError) throw error;

      throw CustomError.internalServer()

    }
  }


  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

    try {
      const exists = await UserModel.findOne({email: loginUserDto.email});

      if (!exists) throw CustomError.badRequest('Verify your credentials');

      const passwordMatch = this.comparePassword(loginUserDto.password, exists.password);

      if (!passwordMatch) throw CustomError.badRequest('Verify your credentials');

      return this.userMapper(exists);


    } catch (error) {

      if (error instanceof CustomError) throw error;

      throw CustomError.internalServer();
    }


  }

}