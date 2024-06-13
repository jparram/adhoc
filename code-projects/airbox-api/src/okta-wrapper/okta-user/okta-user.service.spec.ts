import { Test, TestingModule } from '@nestjs/testing';
import { OktaUserService } from './okta-user.service';

describe('OktaUserService', () => {
  let service: OktaUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OktaUserService],
    }).compile();

    service = module.get<OktaUserService>(OktaUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
