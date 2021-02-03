import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BetResolver } from './bet.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserModule } from './user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql']
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
  ],
  controllers: [AppController],
  providers: [AppService, BetResolver]
})

export class AppModule {}