'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query('SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT })
    await queryInterface.bulkInsert('Travels',
      Array.from({ length: 20 }, () => ({
        name: faker.address.city() + '之旅',
        location: faker.address.city(),
        begin_date: '2019/03/01',
        finish_date: '2019/03/03',
        description: faker.lorem.text(),
        score: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
        image: faker.image.nature(320, 240),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Travels', {});
  }
}
