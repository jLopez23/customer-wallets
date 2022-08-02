import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Customers } from '../../customers/schema/customers.schema';

export type WalletsDocument = Wallets & Document;

@Schema()
export class Wallets {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customers' })
  userID: Customers;

  @Prop()
  balanceUSD: number;

  @Prop()
  balanceCOP: number;
}

export const WalletsSchema = SchemaFactory.createForClass(Wallets);
