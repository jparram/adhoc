import { Injectable } from '@nestjs/common';
import { AxiosProviderService } from '../axios-provider-service/axios-provider-service.service';
import { User } from '../models/user.interface';
import { CreateUser } from '../models/create-user.interface';

@Injectable()
export class OktaUserService {

    constructor(private axiosProviderService: AxiosProviderService) { }

    async getUser(userId: string): Promise<User> {
        const axiosInstance = this.axiosProviderService.getAxiosInstance();
        const response = await axiosInstance.get(`/users/${userId}`);

        return response.data;
    }

    async createUser(userData: CreateUser): Promise<User> {
        const axiosInstance = this.axiosProviderService.getAxiosInstance();
        const response = await axiosInstance.post('/users', userData);

        return response.data;
    }
}
