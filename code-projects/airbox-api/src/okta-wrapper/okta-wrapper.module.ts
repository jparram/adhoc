import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { OktaUserService } from './okta-user/okta-user.service';
import { OktaTokenProviderService } from './okta-token-provider/okta-token-provider.service';
import { AxiosProviderService } from './axios-provider-service/axios-provider-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [OktaUserService, OktaTokenProviderService, AxiosProviderService],
  exports: [OktaUserService, OktaTokenProviderService, AxiosProviderService],
})
export class OktaWrapperModule { }