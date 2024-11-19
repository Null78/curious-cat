import { Module } from "@nestjs/common";
import { EdgeDBService } from "./services/edgedb.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	providers: [EdgeDBService],
	exports: [EdgeDBService],
	imports: [ConfigModule],
})
export class EdgeDBModule {}