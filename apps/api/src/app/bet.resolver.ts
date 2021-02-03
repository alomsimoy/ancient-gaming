import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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
  private bets: BetEntity[] = [
    {
      id: 1,
      userId: 1,
      betAmount: 4.72,
      chance: 54.0,
      payout: 1.12,
      win: false,
    },
    {
      id: 2,
      userId: 2,
      betAmount: 66.2,
      chance: 70.0,
      payout: 49.12,
      win: true,
    },
  ];

  @Query('getBet')
  getBet(@Args('id') id: number): BetEntity {
    return this.bets.find((bet) => bet.id === id);
  }

  @Query('getBetList')
  getBetList(): BetEntity[] {
    return this.bets;
  }

  @Query('getBestBetPerUser')
  getBestBetPerUser(): BetEntity[] {
    return this.bets;
  }

  @Mutation()
  createBet(
    @Args('userId') userId: number,
    @Args('betAmount') betAmount: number,
    @Args('chance') chance: number
  ): BetEntity {
    const dice = Math.random() * 100;

    const newBet = {
      id: this.bets.length + 1,
      userId,
      betAmount,
      chance,
      payout: ((betAmount * (chance - dice + 100)) / 100) - betAmount,
      win: chance > dice,
    };

    this.bets.push(newBet);

    return newBet;
  }
}
