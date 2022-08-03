import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customers, CustomersDocument } from './schema/customers.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name)
    private customersModule: Model<CustomersDocument>,
  ) { }

  async findById(id: string) {
    const customer = await this.customersModule.findById(id);
    if (!customer) {
      throw new NotFoundException(
        `Customer with document ${id} does not exist`,
      );
    }

    return customer;
  }
}
