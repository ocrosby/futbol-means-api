import { User } from "./users.model";

// A post request should no tcontain an id.
export type UserCreationParams = Pick<User, "email" | "name">;

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe"
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      name: userCreationParams.name,
      email: userCreationParams.email
    }
  }
}
