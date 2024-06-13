import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { OktaTokenProviderService } from '../okta-token-provider/okta-token-provider.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosProviderService {
    private axiosInstance: AxiosInstance;

    constructor(private tokenProviderService: OktaTokenProviderService
        , private configService: ConfigService) {

        const oktaDomain = this.configService.get<string>('okta.domain');

        this.axiosInstance = axios.create({
          baseURL: `${oktaDomain}/api/v2`,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use(async (config) => {
            const token = await this.tokenProviderService.getToken();
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        });
    }

    getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}
