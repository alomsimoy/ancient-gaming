import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';

  @Table
  export class User extends Model<User> {
    @Column({
      type: DataType.BIGINT,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    })
    public id: number;
  
    @Column({
      allowNull: false,
    })
    name: string;
  
    @Column({
      allowNull: false,
    })
    balance: number;
  }