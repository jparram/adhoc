// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserMessage } from './user-message.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OktaUserService } from 'src/okta-wrapper/okta-user/okta-user.service';
import { OktaRolesService } from 'src/okta-wrapper/okta-roles/okta-roles.service';
import { CreateRole, Role } from 'src/okta-wrapper/models/role.interface';

@Injectable()
export class UserService {
  constructor(private readonly eventEmitter: EventEmitter2
    , private readonly oktaUserService: OktaUserService
    , private readonly oktaRoleService: OktaRolesService
  ) { }

  async createUser(userMessage: UserMessage) {
    // Logic to create a user in Okta or your database

    // After creating the user, emit an event with the userMessage
    this.eventEmitter.emit('user.created', userMessage);
  }

  async getUser(id: string) {
    return await this.oktaUserService.getUser(id);
  }

  async createRole(createRoleDto: CreateRole): Promise<Role> {
    return this.oktaRoleService.addRole(createRoleDto);
  }
}
