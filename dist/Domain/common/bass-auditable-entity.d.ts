import { BaseEntity } from './base-entity';
export declare abstract class BaseAuditableEntity extends BaseEntity {
    created_at: number;
    updated_at: number;
    deleted_at: number;
}
