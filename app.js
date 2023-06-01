import express, { urlencoded } from 'express';


const app = express();
app.use(urlencoded());
app.use(express.static('public'));
// app.set('view engine', 'ejs');

app.use('/api/Tokens', require('./routes/tokens'));
app.use('/api/Chats', require('./routes/chats'));
app.use('/api/Users', require('./routes/users'));



app.listen(5000);
