import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) {

    }

    @Post("/login")
    async login(@Body() req) {
        let res = await this.loginService.login(req.username, req.password)
        return res
    }

    @Post("/register")
    async register(@Body() req) {
        await this.loginService.register(req.username, req.password)
        return {
            code: "SUCCESS",
            message: "Register successful",
            data: null
        }
    }

}