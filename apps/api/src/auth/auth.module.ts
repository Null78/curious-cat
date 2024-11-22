import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { SeedCommand } from "./commands/seed";
import { PermissionsSeeder } from "./seeders/permissions.seeder";
import { EdgeDBModule } from "src/edgedb/edgedb.module";

@Module({
	controllers: [AuthController],
	imports: [
		UsersModule,
		PassportModule,
		EdgeDBModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '48h' },
			}),
			inject: [ConfigService],
		})
	],
	providers: [AuthService, PermissionsSeeder, SeedCommand],
	exports: [],
})
export class AuthModule { }