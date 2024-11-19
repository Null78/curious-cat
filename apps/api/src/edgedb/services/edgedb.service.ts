import { Injectable, OnModuleInit } from "@nestjs/common";
import { $infer, createClient } from "@packages/db/dbschema/edgeql-js";
import * as T from "@packages/db/dbschema/edgeql-js/typesystem";
import { ConfigService } from "@nestjs/config";
import { Client } from "edgedb";

@Injectable()
export class EdgeDBService implements OnModuleInit {
	public readonly client: Client;

	constructor(private readonly configService: ConfigService) {
		const dsn = this.configService.get<string>('EDGEDB_DSN');
		this.client = createClient({ dsn });
	}

	async onModuleInit() {
		await this.client.ensureConnected();
	}

	public async query<Expr extends T.Expression>(expression: Expr): Promise<$infer<Expr>> {
		return await expression.run(this.client);
	}
}