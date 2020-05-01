let Sequelize = require('sequelize')

let env = process.envNODE_ENV || 'development' // mode we are in
let config = require(__dirname + '/../config.json') [env]

let db = {}

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config) // set for haroku
} else {
    sequelize = new Sequelize(config) // otherwise local
}

const model = sequelize['import']('./student.js') // creates model and sets up tabel in database
db[model.name] = model

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db