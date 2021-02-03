
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BetResolver } from './bet.resolver';
import { Bet } from './bet.model';
import { BetService } from './bet.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Bet]), SequelizeModule.forFeature([User])],
  providers: [BetService, BetResolver, UserService],
})
export class BetModule {}
