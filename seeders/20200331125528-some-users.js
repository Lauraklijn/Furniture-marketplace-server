"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constant");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "testuser",
          email: "user@test.nl",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          imageUrl: "testimage",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "testuser2",
          email: "user2@test.nl",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          imageUrl: "testimage",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
