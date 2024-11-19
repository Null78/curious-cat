import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { EdgeDBModule } from "src/edgedb/edgedb.module";

@Module({
    imports: [EdgeDBModule],
    controllers: [UsersController],
	providers: [UsersService, UserRepository],
	exports: [UsersService],
})
export class UsersModule {}