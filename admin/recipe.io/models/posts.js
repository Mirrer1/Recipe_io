// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Posts = sequelize.define('posts', {
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    desc: {
      type: DataTypes.STRING,
    },
    tips: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'posts',
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/reference-guide/relationships#adding-relationships.
  Posts.associate = (models) => {
    Posts.belongsTo(models.users, {
      foreignKey: {
        name: 'userIdKey',
        field: 'UserId',
      },
      as: 'user',
    });
    Posts.belongsToMany(models.users, {
      through: 'like',
      foreignKey: 'PostId',
      otherKey: 'UserId',
      as: 'usersThroughLikes',
    });
    Posts.belongsToMany(models.hashtags, {
      through: 'posthashtag',
      foreignKey: 'PostId',
      otherKey: 'HashtagId',
      as: 'hashtagsThroughPosthashtags',
    });
    Posts.hasMany(models.alerts, {
      foreignKey: {
        name: 'postIdKey',
        field: 'PostId',
      },
      as: 'alerts',
    });
    Posts.hasMany(models.comments, {
      foreignKey: {
        name: 'postIdKey',
        field: 'PostId',
      },
      as: 'comments',
    });
    Posts.hasMany(models.images, {
      foreignKey: {
        name: 'postIdKey',
        field: 'PostId',
      },
      as: 'images',
    });
  };

  return Posts;
};