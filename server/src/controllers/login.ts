import { Post, Route } from "tsoa";

export interface LoginResponse {
    ok: boolean;
    message: string;
}

@Route("api/login")
export class LoginController {
    @Post("/")
    public async login(username: string, password: string): Promise<LoginResponse> {
        if (username === "user" && password === "pass") {
            return {
                ok: true,
                message: "Login successful"
            };
        } else {
            return {
                ok: false,
                message: "Username or password incorrect"
            };
        }
    }
}
