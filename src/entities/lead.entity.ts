import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({
  name: 'leads',
})
@Unique(['googlePage'])
export class LeadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'company_name', nullable: false })
  companyName: string;

  @Column({ name: 'company_document', nullable: false })
  companyDocument: string;

  @Column({ name: 'responsible_name', nullable: false })
  responsibleName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'google_page', nullable: false })
  googlePage: string;

  @Column({ name: 'comments_expected', nullable: false })
  commentsExpected: string;

  @CreateDateColumn({ name: 'created_at', default: new Date().toISOString() })
  createdAt?: string;
}
