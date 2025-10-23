require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./db/dbConfig");
const app = express();
const port = 5000;
const userRouter = require("./routes/userRoute");
const questionRouter = require("./routes/questionsRoute");
const answerRouter = require("./routes/answerRoute");
const authMiddlewares = require("./midllewares/authMiddleware");

// middlewares
app.use(cors({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ response: "success" });
});
dotenv.config();
app.use("/api/user", userRouter);
app.use("/api/question", authMiddlewares, questionRouter);
app.use("/api/answer", authMiddlewares, answerRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
const start = async () => {
  try {
    const result = await db.execute("select 'databaseConnected'");
    app.listen(port);
    console.log(result[0][0].databaseConnected);
    console.log("server listening at ", port);
  } catch (error) {
    console.log(error.message);
  }
};

start();
