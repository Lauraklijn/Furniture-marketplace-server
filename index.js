const express = require("express");
const app = express();

const loggerMiddleWare = require("morgan");
app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body
    }
  });
});

const authRouter = require("./routers/auth");
app.use("/", authRouter);

const { PORT } = require("./config/constants");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
