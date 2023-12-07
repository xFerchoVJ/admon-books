import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { booksRouter, categoriesRouter, usersRouter } from "./routes/index.js";
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use('/api/books', booksRouter);
app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
