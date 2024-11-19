import { Injectable } from '@nestjs/common';
import e from '@packages/db/dbschema/edgeql-js';
import { User } from '../entities/user.entity';
import { EdgeDBService } from '../../edgedb/services/edgedb.service';

@Injectable()
export class UserRepository {
    constructor(private db: EdgeDBService) {}

    list() {
        let query = e.select(e.auth.User, () => ({
            ...e.auth.User['*']
        }));

        return query.run(this.db.client);
    }

    find(id: User['id']) {
        let query = e.select(e.auth.User, (user) => ({
            ...e.auth.User['*'],
            filter_single: e.op(user.id, '=', id)
        }));

        return query.run(this.db.client);
    }
}