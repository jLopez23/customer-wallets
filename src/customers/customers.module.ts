import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
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
export class CustomersModule {}
