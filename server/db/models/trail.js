const Sequelize = require('sequelize')
const db = require('../db')

const Trail = db.define('trail', {
  name: {type: Sequelize.STRING},
  difficulty: {type: Sequelize.STRING},
  imgSmallMed: {type: Sequelize.STRING},
  conditionStatus: {type: Sequelize.STRING},
  url: {type: Sequelize.STRING},
  ascent: {type: Sequelize.INTEGER},
  descent: {type: Sequelize.INTEGER},
  high: {type: Sequelize.INTEGER},
  low: {type: Sequelize.INTEGER},
  stars: {type: Sequelize.INTEGER},
  starVotes: {type: Sequelize.INTEGER},
  summary: {type: Sequelize.STRING},
  latitude: {type: Sequelize.FLOAT},
  longitude: {type: Sequelize.FLOAT}
})

module.exports = Trail
