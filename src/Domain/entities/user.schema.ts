import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
  user_id: {
    type: String,
    hashKey: true,
  },
  username: {
    type: String,
    index: {
      name: 'UsernameIndex',
      project: ['user_id', 'username'], 
    },
  },
  password: {
    type: String,
  },
  created_at: {
    type: Number,
  },
  updated_at: {
    type: Number,
  },
  deleted_at: {
    type: Number,
  },
});
