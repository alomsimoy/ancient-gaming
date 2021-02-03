import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Bet extends Model<Bet> {
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
  userId: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  betAmount: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  chance: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  payout: number;

  @Column({
    allowNull: false,
  })
  win: boolean;
}
