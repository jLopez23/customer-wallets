import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsDefined, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
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
}
