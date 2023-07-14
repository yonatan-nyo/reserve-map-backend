"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "UserId" });
      Booking.belongsTo(models.Spot, { foreignKey: "SpotId" });
    }
  }
  Booking.init(
    {
      bookingCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Booking Count is required",
          },
          notEmpty: {
            args: true,
            msg: "Booking Count is required",
          },
        },
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Start Time is required",
          },
          notEmpty: {
            args: true,
            msg: "Start Time is required",
          },
        },
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "End Time is required",
          },
          notEmpty: {
            args: true,
            msg: "End Time is required",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      SpotId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
