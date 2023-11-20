import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { DbModule } from "src/db/db.module";

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
