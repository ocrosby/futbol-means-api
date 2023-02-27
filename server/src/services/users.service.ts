import { injectable } from 'inversify'

import User, { type UserInput, type UserDocument } from '../models/users.model'

@injectable()
export class UsersService {
  public async get(id: number, name?: string): UserDocument {
    return await User.findById(id)
  }

  public create(userCreationParams: UserInput): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      name: userCreationParams.name,
      email: userCreationParams.email
    }
  }
}
