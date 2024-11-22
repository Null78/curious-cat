module auth {
    type User extending default::Entity, default::SoftDeleteable {
        required name: str;
        required username: str;
        required email: str;
        required password: str;
        email_verified_at: datetime;
        required role: Role;

        constraint exclusive on (.email);
        constraint exclusive on (.username);
    }

    type Role extending default::Entity, default::SoftDeleteable {
        required name: str;
        required display_name: str;

        constraint exclusive on (.name);
    }

    type PermissionGroup extending default::Entity {
        required name: str;
        required display_name: str;

        constraint exclusive on (.name);
    }

    type Permission extending default::Entity {
        required name: str;
        required display_name: str;
        required permission_group: str;

        constraint exclusive on (.name);
        constraint exclusive on ((.name, .permission_group));
    }

    type PermissionGrant extending default::Entity {
        required permission: str;
        required provider: str {
            constraint one_of('User', 'Role');
        }
        required provider_id: str;

        index on ((.permission, .provider_id));
        constraint exclusive on ((.permission, .provider, .provider_id));
    }
}