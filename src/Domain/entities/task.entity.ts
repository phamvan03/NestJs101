import { BaseAuditableEntity } from '../common/bass-auditable-entity';

export class Task extends BaseAuditableEntity {
  task_id: string;
  task_description: string;
  task_name: string;
  status: number; // 1: active , 2:inactive
  user_id: string;
}
