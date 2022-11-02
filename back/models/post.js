const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({      
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },     
      desc: {
        type: DataTypes.TEXT,        
      },      
      ingredient: {
        type: DataTypes.TEXT,
        allowNull: false,
      },     
      recipes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },     
      tips: {
        type: DataTypes.TEXT,        
      },     
      tags: {
        type: DataTypes.TEXT,        
      },      
    }, {
      modelName: 'Post',
      tableName: 'posts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Alert);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });    
  }
};