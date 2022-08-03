import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallets, WalletsDocument } from './schema/wallets.schema';
import { JwtService } from '@nestjs/jwt';
import { usdConstants } from '../../utils/constants/usd.constants';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallets.name) private walletsModule: Model<WalletsDocument>,
    private jwtService: JwtService,
  ) { }

  async create(createWalletDto: CreateWalletDto, access_token: string) {
    try {
      const customerID = await this.decodeAccessToken(access_token);
      createWalletDto = {
        ...createWalletDto,
        customerID: customerID,
        balanceUSD: createWalletDto.balanceCOP * usdConstants.pesoDollarValue,
      };

      return this.walletsModule.create(createWalletDto);
    } catch (error) {
      throw new BadRequestException('error registering customer', error);
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

    const totalCOP = await this.sumarCOP(
      customerBalance.balanceCOP,
      updateWalletDto.balanceCOP,
    );
    const totalUSD = await this.sumarUSD(
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

  async sumarCOP(currentBalanceCOP: number, rechargedValue: number) {
    return currentBalanceCOP + rechargedValue;
  }

  async sumarUSD(currentBalanceUSD: number, rechargedValue: number) {
    const convertUSD = rechargedValue * usdConstants.pesoDollarValue;
    return currentBalanceUSD + convertUSD;
  }
}
