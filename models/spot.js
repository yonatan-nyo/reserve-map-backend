"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, { foreignKey: "SpotId" });
      Spot.hasMany(models.Transaction, { foreignKey: "SpotId" });
    }
  }
  Spot.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name is required",
          },
          notEmpty: {
            args: true,
            msg: "Name is required",
          },
        },
      },
      isFull: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      isOpen: DataTypes.BOOLEAN,
      isRestaurant: DataTypes.BOOLEAN,
      isCafe: DataTypes.BOOLEAN,
      isPark: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Email is required",
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
        },
      },
      lat: DataTypes.DOUBLE,
      lng: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
