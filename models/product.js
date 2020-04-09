"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      description: {
        type: DataTypes.STRING
      },
      imageUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      productInfo: DataTypes.STRING,
      city: DataTypes.STRING
    },
    {}
  );
  product.associate = function(models) {
    product.belongsTo(models.homepage);
  };
  return product;
};
