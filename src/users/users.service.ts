import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

import { PG_CONNECTION } from "src/constants";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private readonly conn: any) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.conn.query(`
      SELECT *
        FROM users
       WHERE email = '${createUserDto.email}';
    `);

    if (user.rows.length > 0)
      throw new ConflictException("User already exists");

    const hashedPassword = await hash(createUserDto.password, 10);
    await this.conn.query(`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ('${createUserDto.firstName}', '${createUserDto.lastName}', '${createUserDto.email}', '${hashedPassword}');
    `);

    return {
      message: "User registered successfully",
    };
  }
}
