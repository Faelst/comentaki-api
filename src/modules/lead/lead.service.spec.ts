import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeadEntity } from '../../entities';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';

describe('LeadService', () => {
  let sut: LeadService;
  let leadRepository: Repository<LeadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: getRepositoryToken(LeadEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<LeadService>(LeadService);
    leadRepository = module.get<Repository<LeadEntity>>(
      getRepositoryToken(LeadEntity),
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const payload: CreateLeadDto = {
        companyName: 'Comentaki',
        email: 'jhon.due@email.com',
        responsibleName: 'jhon due',
        phone: '098765432',
        companyDocument: '000000000000',
        googlePage: 'https://comentaki.com/asdjlk1hj23jb',
        commentsExpected: [
          'Ola tudo bem 1',
          'Ola tudo bem 2',
          'Ola tudo bem 3',
        ],
      };

      const mockReturnLead = {
        id: 'any_id',
        ...payload,
        createdAt: new Date().toISOString(),
      };

      jest.spyOn(leadRepository, 'create').mockReturnValueOnce({
        ...mockReturnLead,
        commentsExpected: JSON.stringify(mockReturnLead.commentsExpected),
      });
      jest.spyOn(leadRepository, 'save').mockResolvedValue({
        ...mockReturnLead,
        commentsExpected: JSON.stringify(mockReturnLead.commentsExpected),
      });

      const lead = await sut.create(payload);

      expect(lead).toBeDefined();
      expect(lead).toEqual(mockReturnLead);
      expect(leadRepository.create).toBeCalledTimes(1);
    });
  });
});
