import { connectdb } from "./db/dbconnect.js";
import { app } from "./app/app.js";
import { router } from "./routes/user_route.js";

import dotenv from "dotenv"

dotenv.config();

connectdb().then(() => {
    const PORT = process.env.PORT;
    app.use("/", router);
    app.listen(PORT, () => {
        console.log("listening");
    })
})
