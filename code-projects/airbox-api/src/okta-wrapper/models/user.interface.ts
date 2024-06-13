// models/user.interface.ts
import { BaseUser } from './base-user.interface';

export interface User extends BaseUser {
  user_id: string;
  email_verified?: boolean;
  created_at: string;
  updated_at: string;
  identities: Identity[];
  multifactor?: string[];
  last_ip?: string;
  last_login?: string;
  logins_count?: number;
  phone_verified?: boolean;
}

export interface Identity {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}