import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { BetModule } from './bet/bet.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '172.17.0.2',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      autoLoadModels: true,
    }),
    UserModule,
    BetModule,
  ],
})
export class AppModule {}
