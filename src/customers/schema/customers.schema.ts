import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomersDocument = Customers & Document;

@Schema()
export class Customers {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  cedula: number;

  @Prop()
  direccion: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
