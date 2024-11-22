import { PermissionGroup } from "../../auth/entities/permission-group.entity";
import { Permission } from "../../auth/entities/permission.entity";

export class PermissionGroupDefinition {
    group: PermissionGroup;
    permissions: Permission[] = [];

    constructor(name: string, displayName: string) {
        this.group = new PermissionGroup();
        this.group.name = name;
        this.group.display_name = displayName
    }

    addPermission(name: string, displayName: string) {
        const permission = new Permission();
        permission.name = name;
        permission.display_name = displayName;
        permission.permission_group = this.group.name;
        this.permissions.push(permission);
        return this;
    }
}

export class Definitions {
    groups: PermissionGroupDefinition[] = [];

    addGroup(name: string, displayName: string) {
        const group = new PermissionGroupDefinition(name, displayName);
        this.groups.push(group);
        return group;
    }
}