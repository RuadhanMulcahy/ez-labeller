const axios = require("axios");
const express = require('express')
const app = express()
const port = 8000

app.get('/auth', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=6ec826b0db3bb0fa157e`);
})

app.get("/callback", (req, res) => {
  axios.post("https://github.com/login/oauth/access_token", {
    client_id: "6ec826b0db3bb0fa157e",
    client_secret: "e0a64fda5042055894fde3e4c73287383a883455",
    code: req.query.code
  }, {
    headers: {
      Accept: "application/json"
    }
  }).then((result) => {
    axios.get("https://api.github.com/user", {
      headers: {
        'Authorization': 'Bearer ' + result.data.access_token
      }
    }
    ).then((result) => {
      res.send(result.data);
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})