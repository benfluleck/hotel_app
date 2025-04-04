import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  @InjectRepository(Payment)
  private readonly paymentRepository!: Repository<Payment>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = new Payment(createPaymentDto);

    return this.entityManager.save(Payment, payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: string): Promise<Payment | null> {
    return this.paymentRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findOneByOrFail({ id });
    Object.assign(payment, updatePaymentDto);
    return this.entityManager.save(Payment, payment);
  }

  async remove(id: string) {
    await this.paymentRepository.delete({ id });
  }
}
