import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OktaWrapperModule } from './okta-wrapper/okta-wrapper.module';
import { OktaUserService } from './okta-wrapper/okta-user/okta-user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    OktaWrapperModule],
  controllers: [AppController],
  providers: [AppService, OktaUserService],
})
export class AppModule { }
