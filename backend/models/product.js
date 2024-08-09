'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relazione con la categoria: un prodotto appartiene a una categoria
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });

      // Relazione con gli ordini: un prodotto può essere presente in molti ordini
      Product.belongsToMany(models.Order, { through: 'OrderProducts' });

      // Relazione con le recensioni: un prodotto può avere molte recensioni
      Product.hasMany(models.Review, { foreignKey: 'productId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    countInStock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};