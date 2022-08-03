import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Customers } from '../../customers/schema/customers.schema';

export type WalletsDocument = Wallets & Document;

@Schema()
export class Wallets {
  @Prop()
  balanceCOP: number;

  @Prop()
  balanceUSD: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customers',
    unique: true,
  })
  customerID: Customers;
}

export const WalletsSchema = SchemaFactory.createForClass(Wallets);
