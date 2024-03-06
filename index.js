var express = require("express");
var app = express();
const file = "./epd.db";

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS my_tab (id INTEGER PRIMARY KEY, stu_id TEXT)"
  );
});

app.get("/", (_, res) => {
  db.all(`SELECT * FROM my_tab`, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.post("/:param", (req, res) => {
  const param = req.params.param;

  db.run(`INSERT INTO my_tab (stu_id) VALUES (?)`, [param], function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  res.end("Data inserted successfully!");
});

app.listen(8888, function () {
  console.log("mySqlLite listening on port 8888!");
});
