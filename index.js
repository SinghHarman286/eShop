// npm run dev - to start

const express = require("express"),
      app = express();

app.get("/", (req, res) => {
    res.send("yo")
});

app.listen(3000, () => {
    console.log("The Server Has Started :) ")
});