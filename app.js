// npm run dev - to start

const users = require("./repositories/users");

const express = require("express"),
      bodyParser = require("body-parser"),
      userRepo = require("./repositories/users"),
      cookieSession = require("cookie-session"),
      app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['sgsdhshwsd'],

}))

app.get("/signup", (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email">
            <input name="password" placeholder="password">
            <input name="passwordConfirmation" placeholder="password confirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `)
});

app.post("/signup", async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;
    const existingUser = await userRepo.getOneBy({email});
 
    if(existingUser) {
        return res.send("email already in use");
    }

    if(password !== passwordConfirmation) {
        return res.send("password does not match");
    }

    const user = await userRepo.create({email, password});

    req.session.userId  = user.id;

    res.send("account created!");
})

app.get("/signin", (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email">
                <input name="password" placeholder="password">
                <button>Sign In</button>
            </form>
        </div>
    `)
})

app.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const user = await userRepo.getOneBy({email});

    if(!user) {
        return res.send("Email not found");
    }

    const validPassword = await userRepo.comparePasswords(user.password, password);

    if(!validPassword) {
        res.send("password is not defined");
    }

    req.session.userId = user.id;

    res.send("You are signed in!");
})

app.get("/signout", (req, res) => {
    req.session = null;
    res.send("you are signed out");
})

app.listen(3000, () => {
    console.log("The Server Has Started :) ")
});