import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsEmail({ message: 'email: debe ser un correo valido' })
  @IsNotEmpty({ message: 'email: no debe estar vacio' })
  @IsDefined({ message: 'email: es obligatorio' })
  @ApiProperty({
    example: 'julian.lopez@test.com.co',
    description: 'The email of customer',
  })
  email: string;

  @IsString({ message: 'password: debe ser un string' })
  @IsNotEmpty({ message: 'password: no debe estar vacio' })
  @IsDefined({ message: 'password: es obligatorio' })
  @ApiProperty({
    example: 'Secret123+',
    description: 'The password of customer',
  })
  password: string;

  @IsString({ message: 'fullName: debe ser un string' })
  @IsNotEmpty({ message: 'fullName: no debe estar vacio' })
  @IsDefined({ message: 'fullName: es obligatorio' })
  @ApiProperty({
    example: 'Julian Lopez',
    description: 'The fullName of customer',
  })
  fullName: string;

  @IsNumber()
  @IsNotEmpty({ message: 'cedula: no debe estar vacio' })
  @IsDefined({ message: 'cedula: es obligatorio' })
  @ApiProperty({
    example: 1037632452,
    description: 'The cedula of customer',
  })
  cedula: number;

  @IsString({ message: 'direccion: debe ser un string' })
  @IsNotEmpty({ message: 'direccion: no debe estar vacio' })
  @IsDefined({ message: 'direccion: es obligatorio' })
  @ApiProperty({
    example: 'Calle 50B # 22-45',
    description: 'The direccion of customer',
  })
  direccion: string;
}
