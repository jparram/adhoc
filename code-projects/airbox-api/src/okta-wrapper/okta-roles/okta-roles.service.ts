import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { AxiosProviderService } from '../axios-provider-service/axios-provider-service.service';
import { CreateRole, Role } from '../models/role.interface';
import { AddUsersToRole } from '../models/add-users-to-role.interface';

@Injectable()
export class OktaRolesService {

    private axiosInstance: AxiosInstance;

    constructor(private axiosProviderService: AxiosProviderService) {
        this.axiosInstance = this.axiosProviderService.getAxiosInstance();
    }

    async addRole(createRoleDto: CreateRole): Promise<Role> {
        const response = await this.axiosInstance.post('/roles', createRoleDto);
        return response.data;
    }

    async getRoles(
        page?: number,
        per_page?: number,
        sort?: string,
        include_totals?: boolean
    ): Promise<{ roles: Role[], total?: number }> {
        const params: any = {};
        if (page !== undefined) params.page = page;
        if (per_page !== undefined) params.per_page = per_page;
        if (sort !== undefined) params.sort = sort;
        if (include_totals !== undefined) params.include_totals = include_totals;

        const response = await this.axiosInstance.get('/roles', { params });
        return response.data;
    }

    async addUsersToRole(roleId: string, addUsersToRole: AddUsersToRole): Promise<any> {
        const payload = {
            users: addUsersToRole.user_ids,
        };
        console.log(payload);
        const response = await this.axiosInstance.post(`/roles/${roleId}/users`, payload);
        return response.data;
    }
}
