import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model, PrimaryKey, Table, UpdatedAt
} from 'sequelize-typescript';
import {Questions} from './Questions';

import {Users} from './Users';

@Table({tableName: 'notifications'})
export class Notification extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: number


    @BelongsTo(() => Users)
    public users!: Users

    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    public userId !: number

    @BelongsTo(() => Questions)
    public questions!: Questions

    @ForeignKey(() => Questions)
    @Column(DataType.INTEGER)
    public questionId !: number


    @CreatedAt
    @Column(DataType.DATE)
    public createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    public updatedAt!: Date;


}
