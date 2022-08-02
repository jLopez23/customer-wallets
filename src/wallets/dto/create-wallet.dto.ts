import { IsString, IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @IsString({ message: 'userID: debe ser un string' })
  @IsNotEmpty({ message: 'userID: no debe estar vacio' })
  @IsDefined({ message: 'userID: es obligatorio' })
  @ApiProperty({
    example: '62e880aa37caccd1120c34f8',
    description: 'The userID collection',
  })
  userID: string;

  @IsNumber()
  @IsNotEmpty({ message: 'balanceUSD: no debe estar vacio' })
  @IsDefined({ message: 'balanceUSD: es obligatorio' })
  @ApiProperty({
    example: 2500,
    description: 'The value in USD',
  })
  balanceUSD: number;

  @IsNumber()
  @IsNotEmpty({ message: 'balanceCOP: no debe estar vacio' })
  @IsDefined({ message: 'balanceCOP: es obligatorio' })
  @ApiProperty({
    example: 6500000,
    description: 'The value in COP',
  })
  balanceCOP: number;
}
