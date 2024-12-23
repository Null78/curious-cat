import { ApiProperty } from "@nestjs/swagger";
import { auth } from "@packages/db/dbschema/interfaces";
import { Type } from "class-transformer";
import { Role } from "src/auth/entities/role.entity";

export class User implements auth.User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    email_verified_at?: Date;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: Role })
    @Type(() => Role)
    role: Role;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at?: Date;

    @ApiProperty()
    deleted_at?: Date;
}
