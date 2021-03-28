import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt
} from 'sequelize-typescript';
import {Answers} from './Answers';
import {Subscription} from './Subscription';
import {Users} from './Users';
import {Votes} from './Votes';

@Table({tableName: 'questions'})
export class Questions extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: number

    @Column(DataType.STRING)
    public title!: string

    @Column(DataType.TEXT)
    public question !: string

    @Default(0)
    @Column(DataType.INTEGER)
    public counts!: number


    @Column(DataType.ARRAY(DataType.STRING))
    public tags !: string[]


    @Default(false)
    @Column(DataType.BOOLEAN)
    public is_answered !: boolean

    @Default(0)
    @Column(DataType.INTEGER)
    public views !: number
    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    public userId !: number
    @BelongsTo(() => Users)
    public user !: Users

    @HasMany(() => Votes)
    public votes!: Votes[]

    @HasMany(() => Answers,)
    public answers !: Answers[]

    @HasMany(() => Subscription)
    public subscription!: Subscription[]
    @CreatedAt
    @Column(DataType.DATE)
    public createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    public updatedAt!: Date;

}
