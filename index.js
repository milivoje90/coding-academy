const express = require("express");
const { getMySQLConnection } = require("./database/connect");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = getMySQLConnection();

// view engine
app.set("view engine", "ejs");

app.get("/", function (req, res){

  res.render("index", {
      title: "Dashboard",
  })

});

app.get("/sports", function (req, res){

    const connection = getMySQLConnection();
  connection.query("SELECT * FROM sports", function (err, rows, fields) {
    if (err) {
      res
        .status(500)
        .json({ status_code: 500, status_message: "internal server error" });
    } else {
      res.render("sports/index", {
        title: "Sports",
        sports: rows,
      });
    }
  });
  connection.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
  
});

app.get("/sports/add", function (req, res){
    res.render("sports/add", {
        title: "Add Sport"
    })
});

app.post("/sports", function (req, res){
    const connection = getMySQLConnection();
    connection.connect();

    connection.query(
        "INSERT INTO `sports` (`sport_name`, `status`) VALUES ('" + req.body.name + "', 'active');",
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            res
              .status(500)
              .json({ status_code: 500, status_message: "internal server error" });
          } else {
            res.redirect("/sports");
          }
        }
      );

    connection.end(function (err){
        if (err){
            return console.log(err.message);
        }
    });
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