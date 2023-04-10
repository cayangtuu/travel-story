'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const travels = await queryInterface.sequelize.query('SELECT id FROM Travels;',
      { type: queryInterface.sequelize.QueryTypes.SELECT })
    await queryInterface.bulkInsert('Images',
      Array.from({ length: 50 }, (_, i) => ({
        image: `https://loremflickr.com/320/240/outdoor?random=${Math.floor(Math.random() * 50)}`,
        travel_id: travels[i % travels.length].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', {})
  }
}
