import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallets, WalletsSchema } from './schema/wallets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallets.name,
        schema: WalletsSchema,
      },
    ]),
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule { }
