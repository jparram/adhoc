import { Test, TestingModule } from '@nestjs/testing';
import { OktaRolesService } from './okta-roles.service';

describe('OktaRolesService', () => {
  let service: OktaRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OktaRolesService],
    }).compile();

    service = module.get<OktaRolesService>(OktaRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
