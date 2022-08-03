import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Wallet created' })
  create(@Body() createWalletDto: CreateWalletDto, @Headers() headers) {
    return this.walletsService.create(createWalletDto, headers.authorization);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.walletsService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Wallet updated' })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto);
  }
}
