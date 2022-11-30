import { MongoClient } from 'mongodb'
import { Sequelize, QueryTypes } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

export class MigrateDatabase {
    constructor() {
        this.sequelize = new Sequelize({
            host: process.env.HOST,
            dialect: process.env.DIALECT,
            database: process.env.DATABASE,
            username: process.env.DBNAME,
            password: process.env.PASSWORD
        })
        this.mongodb = new MongoClient(process.env.MONGOHOST)
    }

    async migrate(query, database, collection) {
        await this.sequelize.sync({ force: false })
        const myResult = await this.sequelize.query(`SELECT * FROM ${query}`, { type: QueryTypes.SELECT })
        const db = this.mongodb.db(database)
        const collectionMongo = db.collection(collection)
        
        if (myResult.length > 0) {
            collectionMongo.insertMany(myResult)
        } 
    }
}