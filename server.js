var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "farzad1365",
    database: "day_planner_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});


//Routes:
app.get("/", function (req, res) {
    connection.query("SELECT * FROM plans;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.render("index", {
            plans: data
        });
    });
});

// Create a Plan
app.post("/api/plans", function (req, res) {
    connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.plan], function (err, result) {
        if (err) {
            return res.status(500).end();
        }

        res.json({
            id: result.insertId
        });
        console.log({
            id: result.insertId
        });
    });
});

//update a plan
app.put("/api/plans/:id", function (req, res) {
    connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], function (err, result) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        } else if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});

//delete a plan
app.delete("/api/plans/:id", function (req, res) {
    connection.query("DELETE FROM plans WHERE id = ?", [req.params.id], function (err, result) {

        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        } else if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});


app.listen(PORT, function (err) {
    console.log("server is listening to http://localhost/" + PORT);
});