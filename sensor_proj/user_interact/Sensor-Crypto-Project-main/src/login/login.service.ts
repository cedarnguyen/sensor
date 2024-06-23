import { Injectable } from "@nestjs/common";
import { UsersService } from "./user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const salt = 12;

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) {

    }

    async login(username, password) {
        let user = await this.userService.findOne(username)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                status: 0,
                code: "FAILED",
                message: "Login failed",
                data: null
            };
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            status: 1,
            code: "SUCCESS",
            message: "Login successfully",
            data: {
                token: await this.jwtService.signAsync(payload)
            }
        };

    }

    async register(username, password) {
        const hash = await bcrypt.hash(password, salt);
        console.log(hash)
    }
}
