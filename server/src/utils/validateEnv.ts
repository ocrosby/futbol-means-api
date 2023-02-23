import {
  cleanEnv, str, port
} from 'envalid'

export function validateEnv (): void {
  cleanEnv(process.env, {
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_HOST: str(),
    MONGO_PORT: port(),
    MONGO_DB: str()
  })
}
