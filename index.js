import { MongoClient } from 'mongodb'
import { Sequelize, QueryTypes } from 'sequelize'
import * as dotenv from 'dotenv'

(async () => {
    dotenv.config()
    
    const mongodb = new MongoClient('mongodb://localhost:27017')
    const sequelize = new Sequelize({
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        database: process.env.DATABASE,
        username: process.env.DBNAME,
        password: process.env.PASSWORD
    })
    await sequelize.sync({ force: false })
    const myResult = await sequelize.query('SELECT * FROM estado', { type: QueryTypes.SELECT })
    const db = mongodb.db('testando')
    const collection = db.collection('testando')
    
    if (myResult.length > 0) {
        collection.insertMany(myResult)
    } 
})()


