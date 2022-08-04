import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  Customers,
  CustomersDocument,
} from '../customers/schema/customers.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customers.name)
    private readonly customersModule: Model<CustomersDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerCustomer: RegisterAuthDto) {
    try {
      const { password } = registerCustomer;
      const rounds = this.configService.get<number>('hashRounds');
      const passworHash = await hash(password, rounds);
      registerCustomer.password = passworHash;

      return this.customersModule.create(registerCustomer);
    } catch (error) {
      throw new BadRequestException('error registering customer', error);
    }
  }

  async login(loginCustomer: LoginAuthDto) {
    const { email, password } = loginCustomer;

    const findCustomer = await this.customerExists(email);
    this.validatePassword(password, findCustomer.password);

    const accessToken = await this.generateToken(
      findCustomer._id,
      findCustomer.fullName,
    );
    return { accessToken };
  }

  async customerExists(email: string) {
    const findCustomer = await this.customersModule.findOne({ email });
    if (!findCustomer)
      throw new NotFoundException(
        `The client with the email ${email} does not exist`,
      );
    return findCustomer;
  }

  validatePassword(passwordLogin: string, passwordCustomer: string) {
    const password = compare(passwordLogin, passwordCustomer);
    if (!password) throw new ForbiddenException('The password is incorrect');
  }

  async generateToken(id: string, fullName: string) {
    const payload = { id, fullName };
    return await this.jwtService.sign(payload);
  }
}
