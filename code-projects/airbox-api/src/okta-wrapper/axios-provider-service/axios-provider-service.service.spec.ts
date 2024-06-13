import { Test, TestingModule } from '@nestjs/testing';
import { AxiosProviderServiceService } from './axios-provider-service.service';

describe('AxiosProviderServiceService', () => {
  let service: AxiosProviderServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosProviderServiceService],
    }).compile();

    service = module.get<AxiosProviderServiceService>(AxiosProviderServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
