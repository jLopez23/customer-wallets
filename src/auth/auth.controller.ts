import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Serialize } from './interceptor/serialize.interceptor';
import { Customers } from '../customers/schema/customers.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Registered customer' })
  @Serialize(Customers)
  registerCustomer(@Body() registerCustomer: RegisterAuthDto) {
    return this.authService.register(registerCustomer);
  }

  @Post('login')
  loginCustomer(@Body() loginCustomer: LoginAuthDto) {
    return this.authService.login(loginCustomer);
  }
}
