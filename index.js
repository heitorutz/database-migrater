import { MigrateDatabase } from "./migrate.js"

const db = new MigrateDatabase()
db.migrate('pessoas', 'testando', 'testando')


