const { getMySQLConnection } = require("./connect");

const connection = getMySQLConnection();
connection.connect();

connection.query(
    "CREATE TABLE `sports` (`id` INT NOT NULL AUTO_INCREMENT, `sport_name` VARCHAR(45) NULL, `status` VARCHAR(10), PRIMARY KEY (`id`));",
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