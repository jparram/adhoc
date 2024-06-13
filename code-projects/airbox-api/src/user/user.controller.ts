// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserMessage } from './user-message.model';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserMessage })
  @Post()
  async addUser(@Body() userMessage: UserMessage) {
    await this.userService.createUser(userMessage);
    return { message: 'User added successfully' };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return user;
  }
}
