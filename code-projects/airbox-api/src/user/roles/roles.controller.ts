import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateRole, Role } from 'src/okta-wrapper/models/role.interface';
import { UserService } from '../user.service';

@Controller('roles')
export class RolesController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async addRole(@Body() createRoleDto: CreateRole): Promise<Role> {
        return this.userService.createRole(createRoleDto);
    }
}
