const express = require('express');
const { Op } = require('sequelize');

const { User, Post, Image, Comment, Hashtag } = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  // loadHashtagPostsAPI / GET /hashtag/1
  try {
    let searchWord = decodeURIComponent(req.params.tag);
    const where = {
      [Op.or]: [
        { title: { [Op.like]: '%' + searchWord + '%' } },
        { desc: { [Op.like]: '%' + searchWord + '%' } },
      ],
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Hashtag,
          where: { name: { [Op.like]: '%' + searchWord + '%' } },
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: Image,
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
