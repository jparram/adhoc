// models/create-user.interface.ts
import { BaseUser } from './base-user.interface';

export interface CreateUser extends BaseUser {
  email: string;
  password?: string;
  connection: string;
  email_verified?: boolean;
  verify_email?: boolean;
  phone_verified?: boolean;
}