import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey, Model, PrimaryKey, Table, UpdatedAt,
} from 'sequelize-typescript';
import {Answers} from './Answers';
import {Questions} from './Questions';
import {Users} from './Users';

type VoterStatus = 'upvote' | 'downvote';

@Table({tableName: 'votes'})
export class Votes extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: number



    @Column(DataType.ENUM('upvote', 'downvote'))
    public voteType !: VoterStatus



    @BelongsTo(() => Answers)
    public answers!: Answers

    @ForeignKey(() => Answers)
    @Column(DataType.INTEGER)
    public answerId !: number


    @BelongsTo(() => Questions)
    public questions!: Questions

    @ForeignKey(() => Questions)
    @Column(DataType.INTEGER)
    public questionId !: number


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
