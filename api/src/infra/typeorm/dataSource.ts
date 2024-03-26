import { DataSource } from "typeorm";
import "dotenv/config";

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ["./**/*Schema.ts"],
  // migrationsRun: false,
  // migrations: ["./migrations/*.ts"],
  subscribers: [],
});
