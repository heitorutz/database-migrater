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

    async migrate(database) {
        await this.sequelize.sync({ force: false })
        const allTables = await this.sequelize.query(`SHOW TABLES`, { type: QueryTypes.SHOWTABLES })
        allTables.forEach(async (v) => {
            const myResult = await this.sequelize.query(`SELECT * FROM ${v}`, { type: QueryTypes.SELECT })
            const db = this.mongodb.db(database)
            await db.createCollection(v)
            const collectionMongo = await db.collection(v)
            if (myResult.length > 0) {
                collectionMongo.insertMany(myResult)
            } 
        })
    }
}