'use strict'
const faker = require('faker')
const dayjs = require('dayjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query('SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT })
    await queryInterface.bulkInsert('Travels',
      Array.from({ length: 20 }, () => ({
        name: faker.address.cityName() + '之旅',
        location: faker.address.city(),
        begin_date: dayjs(faker.date.past(5)).format('YYYY/MM/DD'),
        finish_date: dayjs(faker.date.recent(5)).format('YYYY/MM/DD'),
        description: faker.lorem.text(),
        score: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
        image: `${faker.image.nature(320, 240)}/${Math.floor(Math.random() * 50)}`,
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
