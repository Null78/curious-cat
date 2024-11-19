import { ApiProperty } from "@nestjs/swagger";
import { auth } from "@packages/db/dbschema/interfaces";

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

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at?: Date;

    @ApiProperty()
    deleted_at?: Date;
}
