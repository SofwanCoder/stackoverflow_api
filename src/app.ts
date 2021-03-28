import { config } from 'dotenv';
config();
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {routerBase} from './modules/routes';
import errorMiddleware from './shared/middlewares/errorHandler';

export const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use('/', routerBase)
app.use(cors())
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Expose-Headers", "x-total-count");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
//     res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
//     next();
// });
app.use(errorMiddleware)
