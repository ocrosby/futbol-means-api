import { Controller, Post, Route, SuccessResponse } from "tsoa";

export interface LoginResponse {
    ok: boolean;
    message: string;
}

@Route("api/login")
export class LoginController extends Controller {
    /**
     * Logs in a user.
     */
    @Post()
    @SuccessResponse("200", "OK")
    
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
