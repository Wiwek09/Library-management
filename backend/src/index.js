import express from "express";
import connection from "./config/dbConfig.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

app.use("/book", bookRoute);

app.listen(8000, async () => {
  console.log("Backed Running Successfully");

  try {
    await connection.authenticate();
    connection.sync();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unnable to connect", error);
  }
});
