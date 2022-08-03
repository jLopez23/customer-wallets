import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CustomersService } from './customers.service';
import { Serialize } from '../auth/interceptor/serialize.interceptor';
import { Customers } from './schema/customers.schema';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Info user' })
  @Serialize(Customers)
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }
}
