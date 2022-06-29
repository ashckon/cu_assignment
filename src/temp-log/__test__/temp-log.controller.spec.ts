import { Test, TestingModule } from '@nestjs/testing';
import { TempLogController } from '../temp-log.controller';
import { TempLogService } from '../temp-log.service';

describe('TempLogController', () => {
  let controller: TempLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempLogController],
      providers: [TempLogService],
    }).compile();

    controller = module.get<TempLogController>(TempLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
