import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateRole, Role } from 'src/okta-wrapper/models/role.interface';
import { UserService } from '../user.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OktaRolesService } from 'src/okta-wrapper/okta-roles/okta-roles.service';
import { AddUsersToRole } from 'src/okta-wrapper/models/add-users-to-role.interface';

@ApiTags('roles')
@Controller('roles')
export class RolesController {

    constructor(private readonly userService: UserService
        , private readonly rolesService: OktaRolesService
    ) { }

    @ApiOperation({ summary: 'Add a new role' })
    @Post()
    async addRole(@Body() createRoleDto: CreateRole): Promise<Role> {
        return this.userService.createRole(createRoleDto);
    }

    @ApiOperation({ summary: 'Get all roles' })
    @Get()
    async getRoles(): Promise<{ roles: Role[], total?: number }> {
        return this.rolesService.getRoles();
    }

    @ApiOperation({ summary: 'Add users to a role' })
    @ApiParam({ name: 'roleId', description: 'ID of the role' })
    @ApiBody({ type: AddUsersToRole })
    @Post(':roleId/users')
    async addUsersToRole(@Param('roleId') roleId: string, @Body() addUsersToRoleDto: AddUsersToRole): Promise<any> {
        return this.rolesService.addUsersToRole(roleId, addUsersToRoleDto);
    }
}
