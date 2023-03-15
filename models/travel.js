'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Travel.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Travel.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    beginDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    score: DataTypes.FLOAT,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Travel',
    tableName: 'Travels',
    underscored: true,
  });
  return Travel;
}