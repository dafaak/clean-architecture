import env from "env-var"

export const envs = () => {
  const port = env.get('PORT').required(true).asPortNumber();
  return {port};
}