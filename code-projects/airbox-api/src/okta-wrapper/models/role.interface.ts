// src/okta-wrapper/models/role.interface.ts

export interface Role {
  id?: string;
  name: string;
  description?: string;
}

export interface CreateRole extends Role { }