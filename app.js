const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const dayjs = require("dayjs");

const app = express();

app.use((req, res, next) => {
    console.log();
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", "page");

/* app.get("/", (req, res) => {
    // res.sendFile("./page/index.html",{root: __dirname});
    let articles = [{ title: "a1" }, { title: "a2" }, { title: "a3" }];
    let now = `the year is now ${dayjs().year()}`
    res.render("index", {
        CourseName: "leung ho yin",
        time: now,
        blogs: articles,
        title: "Index page"
    });
});
app.post("/", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    let articles = [{ title: "a1" }, { title: "a2" }, { title: "a3" }];
    let now = `the year is now ${dayjs().year()}`
    res.render("index", {
        CourseName: "leung ho yin",
        time: now,
        blogs: articles,
        title: "Index page"
    });

}); */
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page"
    });
});
app.get("/.well-known/acme-challenge/50X7FjuJYRg4uw7-XlPtt6dNYj7R6A6pGD-sDFINK5g", (req, res) => {
    res.render("ssl", {
        key: "50X7FjuJYRg4uw7-XlPtt6dNYj7R6A6pGD-sDFINK5g.ig-qYopMCtrAS7VQ5m-WNQELhlzcMDDzdDKGUtmh4V0"
    });
});
app.get("/aboutus", (req, res) => {
    res.redirect("/about");
});
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404 page"
    });
});


// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('./private/privkey1.pem'),
    cert: fs.readFileSync('./private/fullchain1.pem')
  };
// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);