// models/base-user.interface.ts
export interface BaseUser {
  email?: string;
  username?: string;
  phone_number?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  given_name?: string;
  family_name?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  blocked?: boolean;
  external_id?: string;
}
