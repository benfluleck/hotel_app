import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private readonly customersRepository!: Repository<Customer>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer(createCustomerDto);

    return this.entityManager.save(Customer, customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customersRepository.findOneByOrFail({ id });

    Object.assign(customer, updateCustomerDto);
    return this.entityManager.save(Customer, customer);
  }

  remove(id: string) {
    return this.customersRepository.delete({ id });
  }
}
