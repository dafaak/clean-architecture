import 'dotenv/config'
import env from "env-var"

export const envs = {
  port: env.get('PORT').required(true).asPortNumber(),
  mongoUrl: env.get('MONGO_URL').required(true).asString(),
  dbName: env.get('MONGO_DB_NAME').required(true).asString(),
  jwtSeed: env.get('JWT_SEED').required(true).asString()
}