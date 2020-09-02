// npm run dev - to start

const users = require("./repositories/users");

const express = require("express"),
      bodyParser = require("body-parser"),
      authRouter = require("./routes/admin/auth"),
      productsRouter = require("./routes/admin/products"),
      cookieSession = require("cookie-session"),
      app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['sgsdhshwsd'],

}))
app.use(authRouter);


app.listen(3000, () => {
    console.log("The Server Has Started :) ")
});