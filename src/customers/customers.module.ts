import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customers, CustomersSchema } from './schema/customers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customers.name,
        schema: CustomersSchema,
      },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule { }
