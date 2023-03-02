import { User, UserModel } from '../models/user.model'
import { provideSingleton } from "../utils/provideSingleton";

// A post request should not contain unneeded parameters
export type UserCreationParams = Pick<User, "email" | "firstName" | "lastName" | "password">

@provideSingleton(UsersService)
export class UsersService {
  public async get(id: number): Promise<User> {
    return await UserModel.findById(id) as User
  }

  public create(userCreationParams: UserCreationParams, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const newUser = new UserModel(userCreationParams)

      UserModel.register(newUser, password, (err: any, account: User) => {
        if (err) {
          reject(err)
        }

        resolve(account)
      })
    })
  }
}
