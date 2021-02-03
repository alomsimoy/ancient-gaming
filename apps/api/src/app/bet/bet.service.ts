import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { fn, col, literal, ProjectionAlias } from 'sequelize';
import { Literal } from 'sequelize/types/lib/utils';
import { Bet } from './bet.model';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(Bet)
    private betModel: typeof Bet
  ) {}

  async findAll(): Promise<Bet[]> {
    return this.betModel.findAll();
  }

  async create(
    userId: number,
    betAmount: number,
    chance: number,
    payout: number,
    win: boolean
  ): Promise<Bet> {
    const bet = new Bet();
    bet.userId = userId;
    bet.betAmount = betAmount;
    bet.chance = chance;
    bet.payout = payout;
    bet.win = win;
    return bet.save();
  }

  findOne(id: string): Promise<Bet> {
    return this.betModel.findOne({
      where: {
        id,
      },
    });
  }

  findBestBetPerUser(limit?: number): Promise<Bet[]> {
    return this.betModel.findAll({
      attributes: [
        // @ts-ignore: attributes accept Literal
        literal('DISTINCT ON ("userId") "Bet"."userId"'),
        ...Object.keys(this.betModel.rawAttributes),
      ],
      order: [
        ['userId', 'DESC'],
        ['payout', 'DESC'],
      ],
      limit,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
