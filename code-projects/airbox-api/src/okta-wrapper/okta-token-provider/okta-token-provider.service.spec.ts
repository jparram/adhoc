import { Test, TestingModule } from '@nestjs/testing';
import { OktaTokenProviderService } from './okta-token-provider.service';

describe('OktaTokenProviderService', () => {
  let service: OktaTokenProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OktaTokenProviderService],
    }).compile();

    service = module.get<OktaTokenProviderService>(OktaTokenProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
