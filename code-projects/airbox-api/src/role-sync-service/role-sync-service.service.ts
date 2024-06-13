import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRole } from 'src/okta-wrapper/models/role.interface';
import { OktaRolesService } from 'src/okta-wrapper/okta-roles/okta-roles.service';
import { RolesConstants } from 'src/shared/constants/roles.constants';


@Injectable()
export class RoleSyncService implements OnModuleInit {
    constructor(private readonly oktaRoleService: OktaRolesService) { }

    async onModuleInit() {
        await this.syncRoles();
    }

    private async syncRoles() {
        const roles = RolesConstants.getAllRoles();

        for (const role of roles) {
            const createRoleDto: CreateRole = { name: role.name, description: role.description };
            try {
                await this.oktaRoleService.addRole(createRoleDto);
                console.log(`Role ${role.name} synced successfully.`);
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    console.log(`Role ${role.name} already exists.`);
                } else {
                    console.error(`Failed to sync role ${role.name}:`, error.message);
                }
            }
        }
    }
}