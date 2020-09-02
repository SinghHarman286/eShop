const express = require("express");
const {check, validationResult} = require("express-validator");
const userRepo = require("../../repositories/users");
const singUpTemplate = require("../../views/admin/auth/signup");
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
    res.send(singUpTemplate({req}));
});

router.post("/signup", [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.send(singUpTemplate({req, errors}));
    }
    
    const {email, password, passwordConfirmation} = req.body;
    const user = await userRepo.create({email, password});

    req.session.userId  = user.id;

    res.send("account created!");
})

router.get("/signin", (req, res) => {
    res.send(signInTemplate({}));
})

router.post("/signin",[
    requireEmailExist,
    requireValidPasswordForUser
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.send(signInTemplate({errors})) ;
    }
    const {email} = req.body;
    const user = await userRepo.getOneBy({email});
    req.session.userId = user.id;
    res.send("You are signed in!");
})

router.get("/signout", (req, res) => {
    req.session = null;
    res.send("you are signed out");
})

module.exports = router;