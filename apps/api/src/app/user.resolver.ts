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

  @Query('getUser')
  getUser(@Args('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id.toString())
  }
  
  @Query('getUserList')
  getUserList(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Mutation()
  addUser(@Args('name') name: string, @Args('balance') balance: number): Promise<UserEntity> {
    return this.userService.create(name, balance);
  }
}
