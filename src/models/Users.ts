import bcrypt from 'bcrypt'
import {
    AllowNull,
    AutoIncrement,
    BeforeCreate,
    Column,
    CreatedAt,
    DataType,
    Default, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt
} from 'sequelize-typescript';
import {Questions} from './Questions';
import {Rater} from './Rater';
import {Subscription} from './Subscription';
import {Votes} from './Votes';

@Table({tableName: 'users'})
export class Users extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: number

    @Unique
    @Column(DataType.STRING)
    public email!: string

    @Unique
    @Column(DataType.STRING)
    public username!: string

    @AllowNull(true)
    @Column(DataType.STRING)
    public profileURL !: string

    @AllowNull(true)
    @Column(DataType.STRING)
    public fullName!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    public location!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    public title!: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    public twitter!: string

    @AllowNull(true)
    @Column(DataType.STRING)
    public github!: string

    @Column(DataType.STRING)
    public password !: string

    @Default(1)
    @Column(DataType.BIGINT)
    public reputation !: number

    @CreatedAt
    @Column(DataType.DATE)
    public createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    public updatedAt!: Date;

    @HasMany(() => Subscription)
    public subscription !: Subscription[]

    @HasMany(() => Questions)
    public question!: Questions[]

    @HasMany(() => Votes)
    public votes !: Votes[]

    @HasMany(() => Rater)
    public rater !: Rater[]


    @BeforeCreate
    public static encryptPassword(user: Users) {
        user.password = bcrypt.hashSync(user.password, 8);
    }
}
