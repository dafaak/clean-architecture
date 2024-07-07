import { UserEntity } from "../domain";

export type MapperFunction = (object: { [key: string]: any }) => UserEntity;