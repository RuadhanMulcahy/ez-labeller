import express from "express";
require("dotenv").config();

const app = express();
const port = 8000;

import { router as authRouter } from "./routes/auth";
import { router as callbackRouter } from "./routes/auth_callback";

app.use("/auth", authRouter);
app.use("/callback", callbackRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
