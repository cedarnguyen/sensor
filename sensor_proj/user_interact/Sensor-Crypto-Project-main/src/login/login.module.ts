import { Module } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginController } from "./login.controller";
import { UsersService } from "./user.service";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "secret",
            signOptions: { expiresIn: '600s' },
          }),
      ],
    providers: [LoginService, UsersService],
    controllers: [LoginController]
})
export class LoginModule { }
