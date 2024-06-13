// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserMessage } from './user-message.model';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async createUser(userMessage: UserMessage) {
    // Logic to create a user in Okta or your database

    // After creating the user, emit an event with the userMessage
    this.eventEmitter.emit('user.created', userMessage);
  }
}
