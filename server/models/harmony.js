'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Harmony extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Harmony.belongsTo(models.Female)
      Harmony.belongsTo(models.Male)
    }
  }
  Harmony.init({
    FemaleId: DataTypes.INTEGER,
    MaleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Harmony',
  });
  return Harmony;
};