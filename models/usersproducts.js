'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersProducts.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        targetKey: 'id'
      })

      UsersProducts.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
    }
  };
  UsersProducts.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UsersProducts',
  });
  return UsersProducts;
};