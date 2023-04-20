'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collect.belongsTo(models.User, { foreignKey: 'userId' })
      Collect.belongsTo(models.Travel, { foreignKey: 'travelId' })
    }
  };
  Collect.init({
    userId: DataTypes.INTEGER,
    travelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collect',
    tableName: 'Collects',
    underscored: true,
  });
  return Collect
}