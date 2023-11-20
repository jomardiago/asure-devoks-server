import { Module } from "@nestjs/common";
import { Pool } from "pg";

import { PG_CONNECTION } from "src/constants";

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool(),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
