require('dotenv').config()
const mysql = require('mysql');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const port = 3000;

//Setting up Database Credentials.
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//Testing Database Connection.
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Basic GET function that return list of tasks. URL = localhost:3000/tasks
app.get('/tasks', (request, response) => {
    con.query("SELECT * FROM tasks", function (err, result, fields) {
        if (err) throw err 
        response.json({
            tasks: result
        })
    });
})

//Basic POST function that insert value to the database. URL = localhost:3000/tasks/create
app.post('/tasks/create', (request, response) => {
    const title = request.body.title
    const activity = request.body.activity
    const date = require('moment')(request.body.date).format('YYYY-MM-DD HH:mm:ss')

    const sql = `INSERT INTO tasks (title, activity, status, date) VALUES ("${title}", "${activity}", 0, "${date}")`;
    con.query(sql, function (err, result) {
        if (err) response.json(err)
        response.json({
            message: "task inserted."
        })
    }) 
})

//Basic POST function that update a value in the database. URL = localhost:3000/tasks/update
app.post('/tasks/update', (request, response) => {
    const id = request.body.id
    const title = request.body.title
    const activity = request.body.activity
    const status = request.body.status
    const date = require('moment')(request.body.date).format('YYYY-MM-DD HH:mm:ss')

    const sql = `UPDATE tasks SET title = "${title}", activity = "${activity}", status = ${status}, date = "${date}" WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) response.json(err)
        response.json({
            message: "task updated."
        })
    })     
})

//Basic POST function that deletes a value in the database. URL = localhost:3000/tasks/delete
app.post('/tasks/delete', (request, response) => {
    const id = request.body.id
    const sql = `DELETE FROM tasks WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) response.json(err)
        response.json({
            message: "task updated."
        })
    }) 
})

//Test if server is active.
app.listen(port, () => {
    console.log('port is active.')
})