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

    const connection = getMySQLConnection();
    connection.query("SELECT *, sports.sport_name FROM teams JOIN sports on teams.sport = sports.id", function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        res.render("teams/index", {
            title: "Teams Page",
            teams: rows,
        });
      }
    });
    connection.end(function (err) {
      if (err) {
        return console.log(err.message);
      }
    });
});

app.get("/teams/add", function (req, res){
    
    const connection = getMySQLConnection();
    connection.connect();
  
    connection.query("SELECT * FROM sports", function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        res.render("teams/add", {
          title: "Add Team",
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

app.post("/teams", function (req, res) {
    const connection = getMySQLConnection();
    connection.connect();

    connection.query(
        "INSERT INTO `teams` (`name`, `sport`, `short_name`, `home_city`) VALUES ('" + req.body.name + "','"+ req.body.sport +"', '"+ req.body.shortName +"', '"+ req.body.homeCity +"' );",
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            res
              .status(500)
              .json({ status_code: 500, status_message: "internal server error" });
          } else {
            res.redirect("/teams");
          }
        }
      );

    connection.end(function (err){
        if (err){
            return console.log(err.message);
        }
    });
});

app.get("/events", function (req, res){

    const connection = getMySQLConnection();
    connection.query("SELECT * from events", function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        res.render("events/index", {
            title: "Events Page",
            events: rows,
        });
      }
    });
    connection.end(function (err) {
      if (err) {
        return console.log(err.message);
      }
    });
});

app.get("/events/add", function (req, res){
    
    const connection = getMySQLConnection();
    connection.connect();
  
    connection.query("SELECT * FROM teams", function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        res.render("events/add", {
          title: "Add Event",
          teams: rows,
        });
      }
    });
    connection.end(function (err) {
      if (err) {
        return console.log(err.message);
      }
    });  
});

app.post("/events", function (req, res) {
    const connection = getMySQLConnection();
    connection.connect();

    const date = req.body.date;
    const dateArray = date.split("/");
    const formattedDate = dateArray[2] + '/' + dateArray[0] + '/' + dateArray[1];
    
    console.log(req.body);
    connection.query(
        "INSERT INTO `events` (`event_name`, `event_date`, `event_time`, `host_team`, `guest_team`, `location`) VALUES ('" + req.body.name + "','"+ formattedDate +"','"+ req.body.time +"','"+ req.body.host +"', '"+ req.body.guest +"', '"+ req.body.location +"' );",
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            res
              .status(500)
              .json({ status_code: 500, status_message: "internal server error" });
          } else {
            res.redirect("/events");
          }
        }
      );

    connection.end(function (err){
        if (err){
            return console.log(err.message);
        }
    });
});


app.listen(8080, function (err){
    if(err) throw err;
    console.log("server created successfully");
})