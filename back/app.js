const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models')
const app = express();
const passportConfig = require('./passport');

dotenv.config();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:3060',
  credentials: true,
}));

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});