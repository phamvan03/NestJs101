import { Item } from 'dynamoose/dist/Item';
export abstract class BaseEntity extends Item {
  task_id: string;
}
