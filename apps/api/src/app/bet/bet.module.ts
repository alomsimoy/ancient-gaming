
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BetResolver } from './bet.resolver';
import { Bet } from './bet.model';
import { BetService } from './bet.service';

@Module({
  imports: [SequelizeModule.forFeature([Bet])],
  providers: [BetService, BetResolver],
})
export class BetModule {}
