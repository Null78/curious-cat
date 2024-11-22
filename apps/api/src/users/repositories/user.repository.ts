import { Injectable } from '@nestjs/common';
import e from '@packages/db/dbschema/edgeql-js';
import { User } from '../entities/user.entity';
import { EdgeDBService } from '../../edgedb/services/edgedb.service';

@Injectable()
export class UserRepository {
    constructor(private db: EdgeDBService) {}

    create(name: string, username: string, email: string, password: string) {
        return e.insert(e.auth.User, {
            name,
            username,
            email,
            password,
            created_at: new Date(),
        }).run(this.db.client);
    }

    list() {
        let query = e.select(e.auth.User, () => ({
            ...e.auth.User['*'],
            role: {
                ...e.auth.Role['*']
            }
        }));

        return query.run(this.db.client);
    }

    async find(id: User['id']) {
        return (await e.select(e.auth.User, (user) => ({
            ...e.auth.User['*'],
            role: {
                ...e.auth.Role['*']
            },
            filter_single: e.op(user.id, '=', id)
        })).run(this.db.client))[0];
    }

    findByEmail(email: User['email']) {
        return e.select(e.auth.User, (user) => ({
            ...e.auth.User['*'],
            role: {
                ...e.auth.Role['*']
            },
            filter_single: e.op(user.email, "=", email)
        })).run(this.db.client);
    }
}