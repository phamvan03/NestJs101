import { BaseAuditableEntity } from '../common/bass-auditable-entity';

export class User extends BaseAuditableEntity {
  user_id: string;
  username: string;
  password: string;
}
