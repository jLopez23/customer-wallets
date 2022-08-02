import { Expose } from 'class-transformer';

export class CustomerEntity {
  @Expose()
  _id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  cedula: number;

  @Expose()
  direccion: string;
}
