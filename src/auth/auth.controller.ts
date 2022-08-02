import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CustomerEntity } from './entities/customer.entity';
import { Serialize } from './interceptor/serialize.interceptor';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Registered customer' })
  @Serialize(CustomerEntity)
  registerCustomer(@Body() registerCustomer: RegisterAuthDto) {
    return this.authService.register(registerCustomer);
  }

  @Post('login')
  loginCustomer(@Body() loginCustomer: LoginAuthDto) {
    return this.authService.login(loginCustomer);
  }
}
