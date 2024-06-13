// src/auth/token-provider.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OktaTokenProviderService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(private configService: ConfigService) { }

  private async fetchToken(): Promise<void> {
    const tokenUrl = `${this.configService.get<string>('okta.domain')}/oauth/token`;
    const clientId = this.configService.get<string>('okta.clientId');
    const clientSecret = this.configService.get<string>('okta.clientSecret');
    const audience = this.configService.get<string>('okta.audience');

    console.log(this.configService.get('okta'));

    const response = await axios.post(
      tokenUrl,
      {
        client_id: clientId,
        client_secret: clientSecret,
        audience: audience,
        grant_type: 'client_credentials',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    this.token = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
  }

  public async getToken(): Promise<string> {
    if (!this.token || Date.now() >= this.tokenExpiry) {
      await this.fetchToken();
    }
    return this.token!;
  }
}
