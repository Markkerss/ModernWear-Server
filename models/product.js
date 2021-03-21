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
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image_url is required'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 1,
          msg: 'Price must be greater than or equal to 1'
        },
        isNumeric: {
          args: false,
          msg: 'Price must be a number'
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Stock must be greater than or equal to 1'
        },
        isInt: {
          args: false,
          msg: 'Stock must be an integer'
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};