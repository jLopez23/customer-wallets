import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Customers,
  CustomersDocument,
} from '../customers/schema/customers.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customers.name)
    private readonly customersModule: Model<CustomersDocument>,
    private jwtService: JwtService,
  ) { }

  async register(registerCustomer: RegisterAuthDto) {
    try {
      const { password } = registerCustomer;
      const passworHash = await hash(password, 10);
      registerCustomer.password = passworHash;

      return this.customersModule.create(registerCustomer);
    } catch (error) {
      throw new BadRequestException('error registering customer', error);
    }
  }

  async login(loginCustomer: LoginAuthDto) {
    const { email, password } = loginCustomer;

    const findCustomer = await this.customerExists(email);
    await this.validatePassword(password, findCustomer.password);

    const access_token = await this.generateToken(
      findCustomer._id,
      findCustomer.fullName,
    );
    return { access_token };
  }

  async customerExists(email: string) {
    const findCustomer = await this.customersModule.findOne({ email });
    if (!findCustomer)
      throw new NotFoundException(
        `The client with the email ${email} does not exist`,
      );
    return findCustomer;
  }

  async validatePassword(passwordLogin, passwordCustomer) {
    const password = await compare(passwordLogin, passwordCustomer);
    if (!password) throw new ForbiddenException('The password is incorrect');
  }

  async generateToken(id: string, fullName: string) {
    const payload = { id, fullName };
    const token = await this.jwtService.sign(payload);
    return token;
  }
}
