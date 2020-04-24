const express = require("express");
const app = express();

const loggerMiddleWare = require("morgan");
app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

const authMiddleWare = require("./auth/middleware");

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});

const authRouter = require("./routers/auth");
app.use("/", authRouter);

const homePagesRouter = require("./routers/homepages");
app.use("/homepages", homePagesRouter);

const emailRouter = require("./routers/email");
app.use(emailRouter);

const { PORT } = require("./config/constant");

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
