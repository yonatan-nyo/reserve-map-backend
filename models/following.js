"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Following.belongsTo(models.User, { foreignKey: "to" });
      Following.belongsTo(models.User, { foreignKey: "from" });
    }
  }
  Following.init(
    {
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Following",
    }
  );
  return Following;
};
