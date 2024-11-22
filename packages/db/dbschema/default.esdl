module default {
    abstract type SoftDeleteable {
        deleted_at: datetime;
    }
    abstract type Entity {
        required created_at: datetime {
            default := datetime_current();
        }
        updated_at: datetime;
    }
}