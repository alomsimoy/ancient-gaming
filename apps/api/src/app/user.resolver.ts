import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

export interface UserEntity {
  id: number;
  name: string;
  balance: number;
}

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  private users: UserEntity[] = [
    {
      id: 1,
      name: 'User 1',
      balance: 9.99,
    },
    {
      id: 2,
      name: 'User 2',
      balance: 539.56,
    },
  ];

  @Query('getUser')
  getUser(@Args('id') id: number): UserEntity {
    return this.users.find((user) => user.id === id);
  }
  
  @Query('getUserList')
  getUserList(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Mutation()
  addUser(@Args('name') name: string, @Args('balance') balance: number) {
    const newUser = {
      id: this.users.length + 1,
      name,
      balance,
    };

    this.users.push(newUser);

    return newUser;
  }
}
