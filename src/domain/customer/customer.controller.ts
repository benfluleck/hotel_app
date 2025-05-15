import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { ERROR_CODES } from 'src/common/component-entities/error-context';

@Controller('customer')
@UsePipes(ZodValidationPipe)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateCustomerDto))
    createCustomerDto: CreateCustomerDto,
  ) {
    if (!createCustomerDto) {
      throw new HttpException(ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
