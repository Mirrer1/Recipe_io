const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const { Sequelize, Op } = require('sequelize');

const { User, Post, Image, Comment, Alert } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => { // loadMyInfoAPI / GET /user
  try {    
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },        
        order: [[Post, 'createdAt', 'DESC']],
        attributes: { 
          exclude: ['password'] 
        },     
        include: [{
          model: Post,
          attributes: ['id', 'title', 'createdAt'],
        }], 
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/alert', async (req, res, next) => { // loadMyAlertAPI / GET /user/alert
  try {        
    const alert = await Alert.findAll({
      where: { AlertedId: req.user.id },
      attributes: ['id', 'type'],
      order: [['createdAt', 'DESC']],
      include: [{
        model: Post,
        attributes: ['id', 'title'],
      }, {
        model: User,
        attributes: ['id', 'nickname'],
        as: 'Alerter',
      }]
    });    
    
    const divideAlert = alert.slice(0, parseInt(req.query.alertLimit, 10));
    res.status(200).json(divideAlert);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => { // logInAPI / POST /user/login
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.logIn(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
    
    const fullUserWithoutPassword = await User.findOne({
      where: { id: user.id },
      order: [[Post, 'createdAt', 'DESC']],
      attributes: { exclude: ['password'] },      
      include: [{
        model: Post,
        attributes: ['id', 'title', 'createdAt'],
      }], 
    })        
    return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
}); 

router.post('/auth', async (req, res, next) => { // sendAuthMailAPI / POST / user/auth  
  try {    
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    if (user) {
      return res.status(403).send('이미 존재하는 회원입니다.');
    }

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const stringLength = 6;
    let authCode = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      authCode += chars.substring(rnum, rnum + 1)
    };

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: process.env.AUTH_MAIL, pass: process.env.AUTH_MAIL_PASSWORD },
    });
    const mailOptions = {
      from: process.env.AUTH_MAIL,
      to: req.body.email,
      subject: '[Recipe.io] 회원가입 인증 메일이 도착했습니다.',
      html: `
        <div style="font-family: arial, sans-serif; padding: 1em 0 0 2em;">
          <h1 style="font-size: 1.5rem; font-weight: 400; margin-bottom: 1.5em;"><span style="color: #4aa8d8; font-weight:700;">메일인증</span> 안내입니다.</h1>  
          <p>
            <div style="font-size: 0.9rem; margin-bottom: 1em;">안녕하세요.<br /></div>
            <div style="font-size: 0.9rem; margin-bottom: 1em;">Recipe.io를 이용해 주셔서 진심으로 감사드립니다.<br /></div>
            <div style="font-size: 0.9rem; margin-bottom: 1em;">아래 적힌 <span style="color: #4aa8d8; font-weight:700;">'6자리코드'</span>를 복사하여 회원가입을 완료해주세요.<br /></div>
            <div style="font-size: 0.9rem; margin-bottom: 2em;">감사합니다.<br /></div>
          </p>  
          <div style="border: 1px solid #4aa8d8; border-radius: 5px; background-color: #4aa8d8; color: white; width: 150px; text-align: center; padding: 1em 0; margin-bottom: 3em; font-size: 1rem;">${authCode}</div>  
          <h2 style="font-size: 0.7rem; font-weight:400; opacity: 0.5; margin-bottom: 0.5em;">From. Recipe.io</h2>
        </div>              
      `,
    };
    await transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        next(error);
      }
      res.status(200).send(authCode);
    });    
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/', isNotLoggedIn, async(req, res, next) => { // signUpAPI / POST /user
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    });
    res.status(200).send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res) => { // logOutAPI / POST / user/logout  
  req.logout(() => {
    res.send('ok');
  });  
});

router.get('/liked', isLoggedIn, async (req, res, next) => { // loadLikedPostAPI / GET /user/liked
  try {
    const likedPosts = await User.findAll({   
      where: { id: req.user.id },      
      attributes: [],
      order: [
        [Sequelize.literal("(`Liked->Like`.`createdAt`)"), "DESC"],        
        [{ model: Post, as:'Liked' }, Comment, 'createdAt', 'DESC']
      ],      
      include: [{
        model: Post,
        as: 'Liked',        
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Comment,          
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }],
        }, {
          model: Image,
        }]
      }],
    });    
    const likedPostsWithoutUserInfo = likedPosts[0].Liked;
    const divideLikedPosts = likedPostsWithoutUserInfo.slice(0, parseInt(req.query.likedLimit, 10));
    
    res.status(200).json(divideLikedPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/board', isLoggedIn, async (req, res, next) => { // loadBoardPostAPI / GET /user/board
  try {
    const boardPost = await Post.findAll({
      where: { UserId: req.user.id },
      order: [
        [ 'createdAt', 'DESC' ],
        [Comment, 'createdAt', 'DESC'],
      ],      
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: Image,
      }]
    });
    res.status(200).json(boardPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => { // nicknameEditAPI / PATCH / user/nickname
  try {
    const user = await User.findOne({
      where: { nickname: req.body.nickname },
    })
    if (user) {
      return res.status(404).json(`"${req.body.nickname}"은 이미 존재하는 닉네임입니다.`);
    }
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    })
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:alertId/alert', async (req, res, next) => { // checkedAlertAPI / DELETE /user/1(알람 ID)/alert
  try {    
    await Alert.destroy({
      where: { id: req.params.alertId },      
    });
    res.status(200).json({ id: req.params.alertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => { // loadUserInfoAPI / GET / user/1(유저 ID)
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json('존재하지 않는 사용자입니다.');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);    
  }
});

router.get('/:userId/posts', async (req, res, next) => { // loadUserPostsAPI / GET /user/1(유저 ID)/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    }
    const posts = await Post.findAll({
      where,
      limit: 10,      
      order: [['createdAt', 'DESC']],      
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: Image,
      }]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;