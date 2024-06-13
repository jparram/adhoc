import { Test, TestingModule } from '@nestjs/testing';
import { RoleSyncServiceService } from './role-sync-service.service';

describe('RoleSyncServiceService', () => {
  let service: RoleSyncServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleSyncServiceService],
    }).compile();

    service = module.get<RoleSyncServiceService>(RoleSyncServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
