const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { Post, Comment, Image, User, Hashtag, Alert } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads폴더가 존재하지 않아 생성합니다.');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'recipe-io',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', isLoggedIn, async (req, res, next) => { // addPostAPI / POST /post
  try {    
    const post = await Post.create({
      UserId: req.user.id,
      title: req.body.content.title,
      desc: req.body.content.desc,
      ingredient: req.body.content.ingredient,
      recipes: req.body.content.recipes,
      tips: req.body.content.tips,
      tags: req.body.content.tags,           
    });

    if (req.body.content.tags && req.body.content.tags.length !== 0) {            
      const hashtags = req.body.content.tags.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return v;
        }
        return null;
      });
      
      const hashtagArr = hashtags.filter((v, i) => v != null);        
      const result = await Promise.all(hashtagArr.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map((v) => v[0]));    
    };

    if (req.body.imagePaths) {
      if (Array.isArray(req.body.imagePaths)) {
        const images = await Promise.all(req.body.imagePaths.map((image) => Image.create({ src: image })));        
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.imagePaths });
        await post.addImages(image);
      }
    };

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }]
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { // uploadImagesAPI / POST /post/images
  try {    
    res.json(req.files.map((v) => v.location));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/edit', isLoggedIn, async (req, res, next) => {  // editPostAPI / PATCH /post/1(게시글 ID)/edit
  try {
    await Post.update({
      title: req.body.content.title,
      desc: req.body.content.desc,
      ingredient: req.body.content.ingredient,
      recipes: req.body.content.recipes,
      tips: req.body.content.tips,
      tags: req.body.content.tags, 
    }, {
      where: { 
        id: req.params.postId,        
      }
    });

    const post = await Post.findOne({
      where: { id: req.params.postId }
    })

    if (req.body.content.tags && req.body.content.tags.length !== 0) {            
      const hashtags = req.body.content.tags.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return v;
        }
        return null;
      });
      
      const hashtagArr = hashtags.filter((v, i) => v != null);        
      const result = await Promise.all(hashtagArr.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      await post.setHashtags(result.map((v) => v[0]));    
    };

    if (req.body.fullEditImagePaths) {
      if (Array.isArray(req.body.fullEditImagePaths)) {
        const result = await Promise.all(req.body.fullEditImagePaths.map((image) => Image.findOrCreate({           
          where: { src: image },
        })));        
        await post.setImages(result.map((v) => v[0]));
      } else {
        const result = await Image.findOrCreate({ 
          where: { src: req.body.fullEditImagePaths },
        });        
        await post.setImages(result.map((v) => v[0]));
      }
    };

    const fullEditPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }]
    });
        
    res.status(201).json(fullEditPost);    
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/:postId/', async (req, res, next) => { // loadPostAPI / GET /post/1(게시글 ID)
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      order: [[Comment, 'createdAt', 'DESC']],
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
}); 

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {  // addCommentAPI / POST /post/1(게시글 ID)/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
      content: req.body.content,      
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });    
    res.status(201).json(fullComment);

    await Alert.create({      
      type: 'comment',
      CommentId: comment.id,
      PostId: req.params.postId,
      AlertedId: post.User.id,
      AlerterId: req.user.id,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/comment', isLoggedIn, async (req, res, next) => {  // editCommentAPI / PATCH /post/1(게시글 ID)/comment
  try {
    await Comment.update({
      content: req.body.content,
    }, {
      where: { 
        id: req.body.commentId,
        PostId: req.params.postId,        
        UserId: req.user.id,
      }
    });
    const comment = await Comment.findOne({
      where: { id: req.body.commentId },
    });
    res.status(201).json({id: comment.id, content: comment.content});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/comment', isLoggedIn, async (req, res, next) => { // removeCommentAPI / DELETE /post/comment
  try {
    await Alert.destroy({
      where: {
        type: 'comment',
        CommentId: req.body.id,
        PostId: req.body.PostId,
        AlerterId: req.user.id,
      },
    });

    await Comment.destroy({
      where: {
        id: req.body.id,
        PostId: req.body.PostId,
        UserId: req.body.UserId,        
      },
    });
    res.status(200).json({ PostId: req.body.PostId, CommentId: req.body.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // likePostAPI / PATCH /post/1(게시글 ID)/like
  try {
    const post = await Post.findOne({ 
      where: { id: req.params.postId },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }],
    });
    
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }; 
    await post.addLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: req.user.id, Post: post });

    await Alert.create({      
      type: 'like',
      PostId: post.id,
      AlertedId: post.User.id,
      AlerterId: req.user.id,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // unLikePostAPI / DELETE /post/1(게시글 ID)/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    })
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });

    await Alert.destroy({
      where: {
        type: 'like',
        PostId: req.params.postId,
        AlerterId: req.user.id,
      },
    })    
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // removePostAPI / DELETE /post/1(게시글 ID)
  try {
    await Alert.destroy({
      where: {                
        PostId: req.params.postId,
      },
    });
    
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    })
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;