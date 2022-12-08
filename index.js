// importing modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Parse from "parse/node";
import { config } from "dotenv";
config();

// importing routes
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import ordersRoute from "./routes/orders.js";
import paymentsRoute from "./routes/payments.js";
import statisticsRoute from "./routes/statistics.js";

const app = express();

Parse.initialize(
  "7tYDLLZDusCslkoZNEbmHBIm1iZfiZZSE1Gb4gGf",
  "2Q1INA2AtwXjZujRv11koODBNASnVV3HBjEpi3eN"
);
Parse.serverURL = "https://parseapi.back4app.com/";

// middlewares
app.use(express.json());
app.use(cors());

// implementing routes
app.use("/api/auth", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/statistics", statisticsRoute);

app.get("/", (req, res) => res.send({ status: 200, message: "OK" }));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(app.listen(PORT, () => console.log("Connected to the database")))
  .catch((err) => console.log(err));
