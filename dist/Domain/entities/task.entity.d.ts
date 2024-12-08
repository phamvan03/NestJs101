import { BaseAuditableEntity } from '../common/bass-auditable-entity';
export declare class Task extends BaseAuditableEntity {
    task_id: string;
    task_description: string;
    task_name: string;
    status: number;
    user_id: string;
}
