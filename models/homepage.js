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
    },
    {}
  );
  homepage.associate = function (models) {
    homepage.belongsTo(models.user);
    // homepage.hasMany(models.story);
    homepage.hasMany(models.product);
  };
  return homepage;
};
