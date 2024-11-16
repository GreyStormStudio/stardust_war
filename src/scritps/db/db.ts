import { Level } from "level";
const db = new Level('db')
db.put('田所浩二','1145')
export default db;