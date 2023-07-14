"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Following, { foreignKey: "to" });
      User.hasMany(models.Following, { foreignKey: "from" });

      User.belongsToMany(models.User, {
        through: models.Following,
        as: "FollowersList",
        foreignKey: "from",
        otherKey: "to",
      });
      User.belongsToMany(models.User, {
        through: models.Following,
        as: "FollowingsList",
        foreignKey: "to",
        otherKey: "from",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      isOwner: DataTypes.BOOLEAN,
      imgUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
