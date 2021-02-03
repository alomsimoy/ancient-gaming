import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async findAll(limit?: number): Promise<User[]> {
    const options = limit ? { limit } : {}
    return this.userModel.findAll(options);
  }

  async create(name: string, balance: number): Promise<User> {
    const user = new User();
    user.name = name;
    user.balance = balance;
    return user.save();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
