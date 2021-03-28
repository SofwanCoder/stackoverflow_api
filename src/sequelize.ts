import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DATABASE_NAME,
    port: 5432,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    models: [__dirname + '/models'],
    logging: false,
});
