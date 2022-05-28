const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CloudBilling'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Hello Kesava")
    });

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT id as value, region as label FROM regions"
    db.query(sqlSelect, (err, result) =>{
        res.send(result)
    });
});

app.get('/api/getBill/',  (req, res) => {
    console.log(req.query)
    const sqlBillQuery = "CALL test ('"+ req.query.region +"','"+ req.query.optimization_type +"');";
    console.log(sqlBillQuery)
    db.query(sqlBillQuery, (err, result) => {
        res.send(result)
    })
})

app.get('/api/test', (req, res) => {
    res.send(req.query)
});

app.listen(3001, () =>{
    console.log("Running on port 3001");
});