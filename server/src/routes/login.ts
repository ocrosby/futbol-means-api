import * as express from "express";

const router = express.Router();

router.post("/", (req, res, next) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (username === "user" && password === "pass") {
        res.send({
            ok: true,
            message: "Login successful"
        });
    } else {
        res.send({
            ok: false,
            message: "Username or password incorrect"
        });
    }
})

module.exports = router;