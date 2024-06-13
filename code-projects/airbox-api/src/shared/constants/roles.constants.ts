import { Role } from "src/okta-wrapper/models/role.interface";

export class RolesConstants {
    static readonly ADMIN: Role = {
        id: 'admin-role-id',
        name: 'Admin',
        description: 'Administrator role with full access',
    };

    static readonly USER: Role = {
        id: 'user-role-id',
        name: 'User',
        description: 'Regular user role with limited access',
    };

    static readonly MANAGER: Role = {
        id: 'manager-role-id',
        name: 'Manager',
        description: 'Manager role with access to manage resources',
    };

    static readonly SUPPORT: Role = {
        id: 'support-role-id',
        name: 'Support',
        description: 'Support role with access to assist users',
    };

    static getAllRoles(): Role[] {
        const roles: Role[] = [];
        for (const key of Object.keys(this)) {
            if (this[key].id && this[key].name) {
                roles.push(this[key]);
            }
        }
        return roles;
    }
}
