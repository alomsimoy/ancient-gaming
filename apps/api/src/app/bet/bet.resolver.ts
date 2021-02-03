import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { BetService } from './bet.service';

export interface BetEntity {
  id: number;
  userId: number;
  betAmount: number;
  chance: number;
  payout: number;
  win: boolean;
}

@Resolver('Bet')
export class BetResolver {
  constructor(
    private readonly betService: BetService,
    private readonly userService: UserService
  ) {}

  @Query('getBet')
  getBet(@Args('id') id: number): Promise<BetEntity> {
    return this.betService.findOne(id.toString());
  }

  @Query('getBetList')
  getBetList(): Promise<BetEntity[]> {
    return this.betService.findAll();
  }

  @Query('getBestBetPerUser')
  async getBestBetPerUser(@Args('limit') limit?: number): Promise<BetEntity[]> {
    return this.betService.findBestBetPerUser(limit);
  }

  @Mutation()
  async createBet(
    @Args('userId') userId: number,
    @Args('betAmount') betAmount: number,
    @Args('chance') chance: number
  ): Promise<BetEntity> {
    const user = await this.userService.findOne(userId.toString());

    if (user.balance < betAmount) {
      throw `Your balance (${user.balance}) is not enough.`;
    }

    const dice = Math.random() * 100;
    const payout = (betAmount * (chance - dice + 100)) / 100 - betAmount;

    user.balance = user.balance + payout;

    user.save();

    return this.betService.create(
      userId,
      betAmount,
      chance,
      payout,
      chance > dice
    );
  }
}
