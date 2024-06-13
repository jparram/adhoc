// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OktaWrapperModule } from 'src/okta-wrapper/okta-wrapper.module';

@Module({
  imports: [EventEmitterModule, OktaWrapperModule],
  controllers: [UserController],
  providers: [UserService, UserListener],
})
export class UserModule { }
