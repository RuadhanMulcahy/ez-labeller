import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=6ec826b0db3bb0fa157e`);
})

export { router }