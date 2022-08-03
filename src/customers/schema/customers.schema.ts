import { Expose } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomersDocument = Customers & Document;

@Schema()
export class Customers {
  @Prop({ unique: true })
  @Expose()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Expose()
  fullName: string;

  @Prop({ unique: true })
  @Expose()
  cedula: number;

  @Prop()
  @Expose()
  direccion: string;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);
