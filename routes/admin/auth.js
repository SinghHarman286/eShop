const express = require("express");
const {handleErrors} = require("./middlewares");
const userRepo = require("../../repositories/users");
const signUpTemplate = require("../../views/admin/auth/signup");
const signInTemplate = require("../../views/admin/auth/signin");
const {
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireEmailExist,
    requireValidPasswordForUser
} = require("./validators"); 

const router = express.Router();


router.get("/signup", (req, res) => {
    res.send(signUpTemplate({req}));
});

router.post("/signup", [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation
], handleErrors(signUpTemplate), async (req, res) => {
    const {email, password} = req.body;
    const user = await userRepo.create({email, password});

    req.session.userId  = user.id;

    res.redirect("/admin/products");
})

router.get("/signin", (req, res) => {
    res.send(signInTemplate({}));
})

router.post("/signin",[
    requireEmailExist,
    requireValidPasswordForUser
], handleErrors(signInTemplate), async (req, res) => {
    const {email} = req.body;
    const user = await userRepo.getOneBy({email});
    req.session.userId = user.id;
    res.redirect("/admin/products");
})

router.get("/signout", (req, res) => {
    req.session = null;
    res.send("you are signed out");
})

module.exports = router;