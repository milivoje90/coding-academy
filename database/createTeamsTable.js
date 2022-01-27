const { getMySQLConnection } = require("./connect");

const connection = getMySQLConnection();
connection.connect();

connection.query(
    "CREATE TABLE `teams` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(45) NULL,`sport` INT NOT NULL, `short_name` VARCHAR(6), `home_city` VARCHAR(20), PRIMARY KEY (`id`), CONSTRAINT `_fk_team_sport`FOREIGN KEY (`sport`) REFERENCES `sports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);",
    function (err, rows, fields) {
      if (err) {
          console.log(err);
        console.log("internal server error");
      } else {
        console.log("Sports table create success");
        return;
      }
    }
  );

  

  connection.end(function (err){
    if (err){
        return console.log(err.message);
    }
});