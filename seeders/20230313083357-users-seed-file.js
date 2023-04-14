'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'root',
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      avatar: `https://loremflickr.com/320/240/avatar?random=${Math.floor(Math.random() * 50)}`,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      avatar: `https://loremflickr.com/320/240/avatar?random=${Math.floor(Math.random() * 50)}`,
      created_at: new Date(),
      updated_at: new Date()
    },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
