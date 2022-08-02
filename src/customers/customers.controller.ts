import { Controller, Get, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CustomersService } from './customers.service';
import { CustomerEntity } from '../auth/entities/customer.entity';
import { Serialize } from '../auth/interceptor/serialize.interceptor';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Info user' })
  @Serialize(CustomerEntity)
  findOne(@Param('id') id: string, @Headers() headers) {
    return this.customersService.findOne(+id, headers.authorization);
  }
}
