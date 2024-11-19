CREATE MIGRATION m13mbnkg4kp6ls4ek64b6xrsfp2vxollahziriwathxhpu4ml5cl3q
    ONTO initial
{
  CREATE MODULE auth IF NOT EXISTS;
  CREATE ABSTRACT TYPE default::Entity {
      CREATE REQUIRED PROPERTY created_at: std::datetime;
      CREATE PROPERTY updated_at: std::datetime;
  };
  CREATE TYPE auth::PermissionGrants EXTENDING default::Entity {
      CREATE REQUIRED PROPERTY permission: std::str;
      CREATE REQUIRED PROPERTY provider: std::str {
          CREATE CONSTRAINT std::one_of('User', 'Role');
      };
      CREATE REQUIRED PROPERTY provider_id: std::str;
      CREATE CONSTRAINT std::exclusive ON ((.permission, .provider, .provider_id));
      CREATE INDEX ON ((.permission, .provider_id));
  };
  CREATE TYPE auth::PermissionGroups EXTENDING default::Entity {
      CREATE REQUIRED PROPERTY display_name: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE auth::Permissions EXTENDING default::Entity {
      CREATE REQUIRED PROPERTY display_name: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY permission_group: std::str;
  };
  CREATE ABSTRACT TYPE default::SoftDeleteable {
      CREATE PROPERTY deleted_at: std::datetime;
  };
  CREATE TYPE auth::Role EXTENDING default::Entity, default::SoftDeleteable {
      CREATE REQUIRED PROPERTY display_name: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE auth::User EXTENDING default::Entity, default::SoftDeleteable {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY email_verified_at: std::datetime;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
  CREATE TYPE auth::UserRoles EXTENDING default::Entity, default::SoftDeleteable {
      CREATE REQUIRED LINK role: auth::Role;
      CREATE REQUIRED LINK user: auth::User;
  };
};
