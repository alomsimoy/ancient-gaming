import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  constructor(private readonly betService: BetService) {}

  @Query('getBet')
  getBet(@Args('id') id: number): Promise<BetEntity> {
    return this.betService.findOne(id.toString());
  }

  @Query('getBetList')
  getBetList(): Promise<BetEntity[]> {
    return this.betService.findAll();
  }

  @Query('getBestBetPerUser')
  getBestBetPerUser(): Promise<BetEntity[]> {
    return this.betService.findBestPerUser();
  }

  @Mutation()
  createBet(
    @Args('userId') userId: number,
    @Args('betAmount') betAmount: number,
    @Args('chance') chance: number
  ): Promise<BetEntity> {
    const dice = Math.random() * 100;

    return this.betService.create(
      userId,
      betAmount,
      chance,
      ((betAmount * (chance - dice + 100)) / 100) - betAmount,
      chance > dice
    )
  }
}
