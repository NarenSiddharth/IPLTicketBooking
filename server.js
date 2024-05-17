const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8081;

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Naren362004@',  // replace with your MySQL password
    database: 'IplTicket'    // make sure this database exists
});

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Serve HTML file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Insert reservation
app.post('/rev', function(req, res) {
    const { username, match_id, stadium, stand, seats } = req.body;

    const sql = "INSERT INTO reservation (user_name, match_id, stadium_name, stand, seat) VALUES ?";
    const values = seats.map(seat => [username, match_id, stadium, stand, seat]);

    const sql2 = "UPDATE seats SET status = 'occupied' WHERE id = ?";
    seats.forEach(seat => {
        connection.query(sql2, [seat], function(err, results) {
            if (err) {
                console.error(`Error updating seat ${seat}: `, err);
                // Optionally, you can add error handling here
            } else {
                console.log(`Seat ${seat} updated to occupied`);
            }
        });
    });

    connection.query(sql, [values], function(err, results) {
        if (err) throw err;
        console.log("Reservation inserted");
        res.send(results);
    });
});

// Get all seats
app.get('/seats', (req, res) => {
    connection.query('SELECT * FROM seats', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ seats: results });
    });
});

// Update seats
app.post('/seats', (req, res) => {
    const { seats } = req.body;
    if (!Array.isArray(seats)) {
        return res.status(400).json({ error: 'Seats data should be an array' });
    }

    const updates = seats.map((status, index) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE seats SET status = ? WHERE id = ?',
                ['occupied', index + 1],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    });

    Promise.all(updates)
        .then(() => res.status(200).json({ message: 'Seats updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/reg',function(req,res){
    const {username,phone,email,password} = req.body;
    let sql="Insert into customer values (?,?,?,?)";
    connection.query(sql, [username,phone,email,password], function(err, results){
        if(err) throw err;
        console.log("Customer registered");
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
