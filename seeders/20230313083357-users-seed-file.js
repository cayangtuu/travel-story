'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'root',
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('13245678', 10),
      created_at: new Date(),
      updated_at: new Date()
    },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
