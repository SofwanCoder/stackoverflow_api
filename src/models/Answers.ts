import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt
} from 'sequelize-typescript';
import {Comments} from './Comments';
import {Questions} from './Questions';
import {Users} from './Users';
import {Votes} from './Votes';

@Table({tableName: 'answers'})
export class Answers extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: number


    @Column(DataType.TEXT)
    public answer!: string

    @Default(0)
    @Column(DataType.INTEGER)
    public counts!: number

    @ForeignKey(() => Questions)
    @Column(DataType.INTEGER)
    public questionId !: number


    @BelongsTo(() => Questions)
    public questions !: Questions

    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    public userId !: number
    @BelongsTo(() => Users)
    public user !: Users

    @Default(false)
    @Column(DataType.BOOLEAN)
    public is_answer !: boolean

    @HasMany(() => Votes)
    public votes!: Votes[]

    @HasMany(() => Comments)
    public comments!: Comments[]
    @CreatedAt
    @Column(DataType.DATE)
    public createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    public updatedAt!: Date;

}
