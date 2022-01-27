const { getMySQLConnection } = require("./connect");

const connection = getMySQLConnection();
connection.connect();

connection.query(
    "CREATE TABLE `events` (`id` INT NOT NULL AUTO_INCREMENT, `event_name` VARCHAR(45) NOT NULL, `event_date_time` DATETIME NOT NULL, `guest_team` INT NOT NULL, `host_team` INT NOT NULL, `location` VARCHAR(45), PRIMARY KEY (`id`), CONSTRAINT `_fk_event_host`FOREIGN KEY (`host_team`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `_fk_event_guest`FOREIGN KEY (`guest_team`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE  ) ",
    function (err, rows, fields) {
      if (err) {
          console.log(err);
        console.log("internal server error");
      } else {
        console.log("Events table create success");
        return;
      }
    }
  );

  

  connection.end(function (err){
    if (err){
        return console.log(err.message);
    }
});