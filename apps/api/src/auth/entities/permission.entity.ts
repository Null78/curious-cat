import { ApiProperty } from "@nestjs/swagger";
import { auth } from "@packages/db/dbschema/interfaces";

export class Permission implements auth.Permission {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    display_name: string;

    @ApiProperty()
    permission_group: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at?: Date;

    @ApiProperty()
    deleted_at?: Date;
}
