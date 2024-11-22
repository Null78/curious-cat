CREATE MIGRATION m1sv5fyqulflfskz3qkg7nahzuegnji3qmu6n27uv7fdhnpuvtkdla
    ONTO initial
{
  CREATE MODULE auth IF NOT EXISTS;
  CREATE ABSTRACT TYPE default::Entity {
      CREATE REQUIRED PROPERTY created_at: std::datetime;
      CREATE PROPERTY updated_at: std::datetime;
  };
  CREATE TYPE auth::Permission EXTENDING default::Entity {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY permission_group: std::str;
      CREATE CONSTRAINT std::exclusive ON ((.name, .permission_group));
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY display_name: std::str;
  };
  CREATE TYPE auth::PermissionGrant EXTENDING default::Entity {
      CREATE REQUIRED PROPERTY permission: std::str;
      CREATE REQUIRED PROPERTY provider: std::str {
          CREATE CONSTRAINT std::one_of('User', 'Role');
      };
      CREATE REQUIRED PROPERTY provider_id: std::str;
      CREATE CONSTRAINT std::exclusive ON ((.permission, .provider, .provider_id));
      CREATE INDEX ON ((.permission, .provider_id));
  };
  CREATE TYPE auth::PermissionGroup EXTENDING default::Entity {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY display_name: std::str;
  };
  CREATE ABSTRACT TYPE default::SoftDeleteable {
      CREATE PROPERTY deleted_at: std::datetime;
  };
  CREATE TYPE auth::Role EXTENDING default::Entity, default::SoftDeleteable {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY display_name: std::str;
  };
  CREATE TYPE auth::User EXTENDING default::Entity, default::SoftDeleteable {
      CREATE REQUIRED LINK role: auth::Role;
      CREATE REQUIRED PROPERTY username: std::str;
      CREATE CONSTRAINT std::exclusive ON (.username);
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE CONSTRAINT std::exclusive ON (.email);
      CREATE PROPERTY email_verified_at: std::datetime;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
  };
};
