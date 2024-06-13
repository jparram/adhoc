// src/user/user.listener.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserMessage } from './user-message.model';
import { OktaUserService } from 'src/okta-wrapper/okta-user/okta-user.service';
import { CreateUser } from 'src/okta-wrapper/models/create-user.interface';

@Injectable()
export class UserListener {

  constructor(private oktaUserService: OktaUserService) { }

  @OnEvent('user.created')
  async handleUserCreatedEvent(userMessage: UserMessage) {

    // todo: get user via database, map to create user

    const newUser: CreateUser = {
      email: "testEmail+test@gmail.com",
      password: "TestPassword123~",
      connection: 'test-connection', // Or another connection if needed
    };

    try {
      const createdUser = await this.oktaUserService.createUser(newUser);
      console.log('User created successfully:', createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }

  }
}
