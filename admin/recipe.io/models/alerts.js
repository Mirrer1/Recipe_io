// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Alerts = sequelize.define('alerts', {
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'alerts',
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/reference-guide/relationships#adding-relationships.
  Alerts.associate = (models) => {
    Alerts.belongsTo(models.comments, {
      foreignKey: {
        name: 'commentIdKey',
        field: 'CommentId',
      },
      as: 'comment',
    });
    Alerts.belongsTo(models.posts, {
      foreignKey: {
        name: 'postIdKey',
        field: 'PostId',
      },
      as: 'post',
    });
    Alerts.belongsTo(models.users, {
      foreignKey: {
        name: 'alerterIdKey',
        field: 'AlerterId',
      },
      as: 'alerter',
    });
    Alerts.belongsTo(models.users, {
      foreignKey: {
        name: 'alertedIdKey',
        field: 'AlertedId',
      },
      as: 'alerted',
    });
  };

  return Alerts;
};