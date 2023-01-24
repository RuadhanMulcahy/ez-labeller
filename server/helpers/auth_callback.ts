import axios from "axios";

async function githubGetAccessToken(req, res) {
  return await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code: req.query.code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
}

async function githubGetUser(access_token) {
  return await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
}

export { githubGetAccessToken, githubGetUser };
