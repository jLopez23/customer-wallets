import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  customerID: string;
  balanceUSD: number;

  @IsNumber()
  @IsNotEmpty({ message: 'balanceCOP: no debe estar vacio' })
  @IsDefined({ message: 'balanceCOP: es obligatorio' })
  @ApiProperty({
    example: 6500000,
    description: 'the value must be in COP',
  })
  balanceCOP: number;
}
