const express = require('express');
const { Sequelize, Op } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/top', async (req, res, next) => { // loadTopPostsAPI / GET /posts/top
  try {
    const posts = await Post.findAll({
      offset: 0,                           
      order: [
        [Sequelize.literal("COUNT(`Likers->Like`.`PostId`) OVER (PARTITION BY `Post`.`id`)"), "DESC"],
        [Comment, 'createdAt', 'DESC'],
        [Image, 'id', 'ASC'],
      ],
      subQuery: false,
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],               
      }],          
    })
    const splitPosts = posts.slice(0, 12);       
    res.status(200).json(splitPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => { // loadPostsAPI / GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
        [Image, 'id', 'ASC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });    
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;