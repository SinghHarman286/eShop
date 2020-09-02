// npm run dev - to start

const express = require("express"),
      bodyParser = require("body-parser"),
      userRepo = require("./repositories/users"),
      app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send(`
    <div>
        <form method="POST" action="/name">
            <input name="email" placeholder="email">
            <input name="password" placeholder="password">
            <input name="passwordConfirmation" placeholder="password confirmation">
            <button>Sign Up</button>
        </form>
    </div>
    `)
});

app.post("/name", async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;
    const existingUser = await userRepo.getOneBy({email});
 
    if(existingUser) {
        return res.send("email already in use");
    }

    if(password !== passwordConfirmation) {
        return res.send("password does not match");
    }

    
})

app.listen(3000, () => {
    console.log("The Server Has Started :) ")
});