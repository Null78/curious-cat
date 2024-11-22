import { ApiProperty } from "@nestjs/swagger";
import { auth } from "@packages/db/dbschema/interfaces";

export class Role implements auth.Role {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    display_name: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at?: Date;

    @ApiProperty()
    deleted_at?: Date;
}
