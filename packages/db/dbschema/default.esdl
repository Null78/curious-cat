module default {
    abstract type SoftDeleteable {
        deleted_at: datetime;
    }
    abstract type Entity {
        required created_at: datetime;
        updated_at: datetime;
    }
}