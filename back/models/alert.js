const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Alert extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        type: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        PostId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        CommentId: {
          type: DataTypes.INTEGER,
        },
        AlerterId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        AlertedId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: 'Alert',
        tableName: 'alerts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Alert.belongsTo(db.Post);
    db.Alert.belongsTo(db.Comment);
    db.Alert.belongsTo(db.User, { as: 'Alerter' });
    db.Alert.belongsTo(db.User, { as: 'Alerted' });
  }
};
