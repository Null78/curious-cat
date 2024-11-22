import { Injectable } from "@nestjs/common";
import { Seeder } from "../../shared/interfaces/seeder.interface";
import { PermissionGroup } from "../entities/permission-group.entity";
import { Permission } from "../entities/permission.entity";
import { Definitions } from "src/shared/permissions/permissions.definition";
import { Permissions } from "src/shared/permissions/permissions";
import { EdgeDBService } from "src/edgedb/services/edgedb.service";
import e from '@packages/db/dbschema/edgeql-js';

type PermissionGroupDefinition = {
    group: PermissionGroup;
    permissions: Permission[];
}

@Injectable()
class PermissionsSeeder implements Seeder {
    constructor(private db: EdgeDBService) { }

    setup(definitions: Definitions) {
        definitions.addGroup('users', 'User Management')
            .addPermission(Permissions.users.view, 'View User')
            .addPermission(Permissions.users.create, 'Create User')
            .addPermission(Permissions.users.update, 'Update User')
            .addPermission(Permissions.users.delete, 'Delete User');
    }

    async run(): Promise<void> {
        const definitions = new Definitions();
        this.setup(definitions);

        definitions.groups.forEach(async (group: PermissionGroupDefinition) => {
            await e.insert(e.auth.PermissionGroup, {
                name: group.group.name,
                display_name: group.group.display_name
            }).unlessConflict(permissionGroup => ({
                on: permissionGroup.name,
                else: e.update(permissionGroup, () => ({
                    set: {
                        display_name: group.group.display_name,
                    }
                })),
            })).run(this.db.client);

            const query = e.params({ items: e.json }, (params) => {
                return e.for(e.json_array_unpack(params.items), (item) => {
                    return e.insert(e.auth.Permission, {
                        name: e.cast(e.str, item.name),
                        display_name: e.cast(e.str, item.display_name),
                        permission_group: e.cast(e.str, item.permission_group),
                    }).unlessConflict(permission => ({
                        on: permission.name || e.tuple([permission.name, permission.permission_group]),
                        else: e.update(permission, () => ({
                            set: {
                                display_name: e.cast(e.str, item.display_name),
                                permission_group: e.cast(e.str, item.permission_group),
                            }
                        })),
                    }));
                });
            });

            await query.run(this.db.client, {
                items: group.permissions,
            });
        });
    }
}