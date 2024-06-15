'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Female extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Female.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    datebirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Must be filled!',
        },
        notEmpty: {
          msg: 'Must be filled!',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Female',
  });
  return Female;
};