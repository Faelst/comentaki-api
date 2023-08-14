import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadEntity } from '../../entities';
import { Repository } from 'typeorm';
import { AppError } from '../../utils/AppError';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadEntity)
    private readonly leadRepository: Repository<LeadEntity>,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    await this.leadRepository.findOne({
      where: {
        googlePage: createLeadDto.googlePage,
      },
    });

    const lead = await this.leadRepository
      .createQueryBuilder(LeadEntity.name)
      .where(
        `${LeadEntity.name}.googlePage = :googlePage OR ${LeadEntity.name}.companyDocument = :companyDocument`,
        {
          googlePage: createLeadDto.googlePage,
          companyDocument: createLeadDto.companyDocument,
        },
      )
      .getOne();

    if (lead) {
      throw new AppError('Cadastro ja realizado');
    }

    return this.leadRepository.save(
      this.leadRepository.create({
        ...createLeadDto,
        commentsExpected: JSON.stringify(createLeadDto.commentsExpected),
      }),
    );
  }

  findAll() {
    return this.leadRepository.find();
  }
}
