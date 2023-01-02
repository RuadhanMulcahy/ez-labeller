import express from "express";
import { githubGetAccessToken, githubGetUser } from "../helpers/auth";

const router = express.Router();

router.get("/", (req, res) =>
  githubGetAccessToken(req, res)
    .then((result) => {
      githubGetUser(result.data.access_token)
        .then((result) => {
          res.send(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
);

export { router };
