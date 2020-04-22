"use strict";
module.exports = (sequelize, DataTypes) => {
  const homepage = sequelize.define(
    "homepage",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
    },
    {}
  );
  homepage.associate = function (models) {
    homepage.belongsTo(models.user);

    homepage.hasMany(models.product);
  };
  return homepage;
};
