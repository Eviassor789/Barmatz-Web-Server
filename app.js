import express, { urlencoded } from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import customEnv from 'custom-env';
import routesChats from './routes/chats.js';
import routesTokens from'./routes/tokens.js';
import routesUsers from './routes/users.js';

customEnv.env(process.env.NODE_ENV, './config')
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cors());
// app.use(json());
app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');

app.use('/api/Tokens', routesTokens);
app.use('/api/Chats', routesChats);
app.use('/api/Users', routesUsers);

app.listen(process.env.PORT);
