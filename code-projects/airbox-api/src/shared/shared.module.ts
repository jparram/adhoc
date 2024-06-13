import { Module } from '@nestjs/common';
import { RolesConstants } from './constants/roles.constants';

@Module({
    providers: [
        {
            provide: 'ROLES_CONSTANTS',
            useValue: RolesConstants,
        },
    ],
    exports: ['ROLES_CONSTANTS'],
})
export class SharedModule { }
