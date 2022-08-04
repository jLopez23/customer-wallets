import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallets, WalletsDocument } from './schema/wallets.schema';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallets.name) private walletsModule: Model<WalletsDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(createWalletDto: CreateWalletDto, accessToken: string) {
    try {
      const customerID = await this.decodeAccessToken(accessToken);
      const pesoDollarValue = this.configService.get<number>('pesoDollarValue');
      createWalletDto = {
        ...createWalletDto,
        customerID: customerID,
        balanceUSD: createWalletDto.balanceCOP * pesoDollarValue,
      };

      return this.walletsModule.create(createWalletDto);
    } catch (error) {
      throw new BadRequestException('error registering wallet', error);
    }
  }

  async findById(id: string) {
    const customerBalance = await this.walletsModule
      .findById(id)
      .populate('customerID');

    if (!customerBalance) {
      throw new NotFoundException(
        `the balance sheet of customer ${id} does not exist`,
      );
    }

    return customerBalance;
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const customerBalance = await this.walletsModule.findById(id);

    const totalCOP = this.addCOP(
      customerBalance.balanceCOP,
      updateWalletDto.balanceCOP,
    );
    const totalUSD = this.addUSD(
      customerBalance.balanceUSD,
      updateWalletDto.balanceCOP,
    );

    updateWalletDto = {
      customerID: customerBalance.customerID.toString(),
      balanceCOP: totalCOP,
      balanceUSD: totalUSD,
    };

    try {
      return await this.walletsModule.findByIdAndUpdate(id, updateWalletDto);
    } catch (error) {
      throw new BadRequestException('error updating customer', error);
    }
  }

  async decodeAccessToken(token: string) {
    const decodedJwt = (await this.jwtService.decode(token.split(' ')[1])) as {
      id: string;
    };

    return decodedJwt.id;
  }

  addCOP(currentBalanceCOP: number, rechargedValue: number) {
    return currentBalanceCOP + rechargedValue;
  }

  addUSD(currentBalanceUSD: number, rechargedValue: number) {
    const pesoDollarValue = this.configService.get<number>('pesoDollarValue');
    const convertUSD = rechargedValue * pesoDollarValue;
    return currentBalanceUSD + convertUSD;
  }
}
