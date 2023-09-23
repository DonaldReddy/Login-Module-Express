import mongoose from "mongoose";
import dotenv from "dotenv"
import MongoDBStore from "connect-mongodb-session";
import session from "express-session";

dotenv.config();
// connecting to DataBase.
const MONGO_URI = process.env.MONGO_URI + process.env.MONGO_DB;

async function connectdb() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to DB");
    } catch (error) {
        throw new Error(error.message);
    }
}

// Setting session storage
const MongoDBSession = MongoDBStore(session);

const SESSION_STORE = new MongoDBSession({
    uri: MONGO_URI,
    collection: "sessions",
})

export { connectdb, SESSION_STORE };