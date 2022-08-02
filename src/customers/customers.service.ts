import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customers, CustomersDocument } from './schema/customers.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name)
    private customersModule: Model<CustomersDocument>,
    private jwtService: JwtService,
  ) { }

  async findOne(id: number, access_token: string) {
    const decodedJwt = this.jwtService.decode(access_token.split(' ')[1]) as {
      id: string;
    };

    const customer = await this.customersModule.findById(decodedJwt.id);
    if (!customer) {
      throw new NotFoundException(`El cliente con cedula ${id} no existe`);
    }
    return customer;
  }
}
