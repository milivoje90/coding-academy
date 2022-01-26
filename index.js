const express = require("express");


const app = express();

// view engine
app.set("view engine", "ejs");

app.get("/", function (req, res){

  res.render("index", {
      title: "Dashboard",
  })

});

app.get("/sports", function (req, res){

    res.render("sports/index", {
        title: "Sports Page",
    })
  
});

app.get("/sports/add", function (req, res){
    res.render("sports/add", {
        title: "Add Sport"
    })
});

app.get("/teams", function (req, res){

    res.render("teams/index", {
        title: "Teams Page",
    })
  
});

app.get("/teams/add", function (req, res){
    res.render("teams/add", {
        title: "Add Team",
    })
});


app.listen(8080, function (err){
    if(err) throw err;
    console.log("server created successfully");
})