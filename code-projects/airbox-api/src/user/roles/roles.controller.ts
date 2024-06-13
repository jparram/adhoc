import { Controller, Post, Body, Get, Delete, Param, Query, Patch } from '@nestjs/common';
import { CreateRole, Role, UpdateRole } from 'src/okta-wrapper/models/role.interface';
import { UserService } from '../user.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

    @ApiOperation({ summary: 'Get a role by ID' })
    @ApiParam({ name: 'id', description: 'ID of the role' })
    @Get(':id')
    async getRole(@Param('id') id: string): Promise<any> {
        return this.rolesService.getRole(id);
    }

    @ApiOperation({ summary: 'Delete a role by ID' })
    @ApiParam({ name: 'id', description: 'ID of the role' })
    @Delete(':id')
    async deleteRole(@Param('id') id: string): Promise<any> {
        return this.rolesService.deleteRole(id);
    }

    @ApiOperation({ summary: 'Update an existing role' })
    @ApiParam({ name: 'id', description: 'ID of the role' })
    @ApiBody({ type: UpdateRole })
    @Patch(':id')
    async updateRole(@Param('id') id: string, @Body() createRoleDto: UpdateRole): Promise<Role> {
        return this.rolesService.updateRole(id, createRoleDto);
    }

    @ApiOperation({ summary: 'Get all roles' })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'per_page', required: false })
    @ApiQuery({ name: 'sort', required: false })
    @ApiQuery({ name: 'include_totals', required: false, type: Boolean })
    @Get()
    async getRoles(
        @Query('page') page?: number,
        @Query('per_page') per_page?: number,
        @Query('sort') sort?: string,
        @Query('include_totals') include_totals?: boolean
    ): Promise<{ roles: Role[], total?: number }> {
        return this.rolesService.getRoles(page, per_page, sort, include_totals);
    }

    @ApiOperation({ summary: 'Add users to a role' })
    @ApiParam({ name: 'roleId', description: 'ID of the role' })
    @ApiBody({ type: AddUsersToRole })
    @Post(':roleId/users')
    async addUsersToRole(@Param('roleId') roleId: string, @Body() addUsersToRoleDto: AddUsersToRole): Promise<any> {
        return this.rolesService.addUsersToRole(roleId, addUsersToRoleDto);
    }
}
