import { MigrateDatabase } from "./migrate.js"

const db = new MigrateDatabase()
db.migrate('SELECT * FROM estado', 'testando', 'testando')


