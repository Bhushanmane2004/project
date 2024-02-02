import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
const port = 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bhushan@01",
    database: "Login",
    insecureAuth: true
});

// Check MySQL connection
db.connect(err => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to database");
    }
});

app.get("/", (req, res) => {
    res.render("login.ejs"); // Assuming you have login.ejs in your views directory
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    // Check if the user exists
    db.query("SELECT * FROM User WHERE Username = ?", [username], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (result.length > 0) {
            console.log("User exists");
            const storedPassword = result[0].Password;
            // Compare passwords or perform any necessary authentication here
            if (password === storedPassword) {
                console.log("Password matched");
                res.send("Login successful");
            } else {
                console.log("Password does not match");
                res.send("Incorrect password");
            }
        } else {
            console.log("User does not exist");
            // Create new user
            db.query("INSERT INTO User (Username, Password) VALUES (?, ?)", [username, password], (err, result) => {
                if (err) {
                    console.error("Error creating user:", err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("User created");
                    res.send("User created successfully");
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
