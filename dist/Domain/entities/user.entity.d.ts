import { BaseAuditableEntity } from '../common/bass-auditable-entity';
export declare class User extends BaseAuditableEntity {
    user_id: string;
    username: string;
    password: string;
}
