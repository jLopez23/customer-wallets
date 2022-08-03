import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWalletDto {
  customerID: string;
  balanceUSD: number;

  @IsNumber()
  @IsNotEmpty({ message: 'balanceCOP: no debe estar vacio' })
  @IsDefined({ message: 'balanceCOP: es obligatorio' })
  @ApiProperty({
    example: 500000,
    description: 'the value must be in COP',
  })
  balanceCOP: number;
}
