"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const saltRounds = 10;
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "testuser",
          email: "user@test.nl",
          password: bcrypt.hashSync("test1234", saltRounds),
          imageUrl: "testimage",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "testuser2",
          email: "user2@test.nl",
          password: bcrypt.hashSync("test1234", saltRounds),
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
