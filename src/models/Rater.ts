import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model, PrimaryKey, Table, UpdatedAt
} from 'sequelize-typescript';

import {Users} from './Users';

@Table({tableName: 'vote_rate'})
export class Rater extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: number


    @Column(DataType.INTEGER)
    public counts !: number

    @Column(DataType.STRING)
    public date !: string

    @BelongsTo(() => Users)
    public users!: Users

    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    public userId !: number


    @CreatedAt
    @Column(DataType.DATE)
    public createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    public updatedAt!: Date;


}
