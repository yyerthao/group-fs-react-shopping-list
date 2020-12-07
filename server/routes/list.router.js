const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
router.get('/', (req, res) => { // getting request from server
    const sqlText = `SELECT * FROM shopping_list ORDER BY name, purchased ASC;`;
    pool.query(sqlText) // requesting the information from the DB
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.send(result.rows); // returning the information to the client-side
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    const newItem = req.body; // this is the newItem object send from client-side
    console.log(newItem);
    const sqlText = `INSERT INTO shopping_list (name, quantity, unit) VALUES 
        ($1, $2, $3);`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool.query(sqlText, [newItem.name, newItem.quantity, newItem.unit]) 
        .then((result) => {
            console.log(`Added item to the database`, newItem);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

// PUT route
router.put('/:id', (req, res) => { // id is passed here as ':id' and it becomes the reqId, which becomes the $1 in the SQL text
    let reqId = req.params.id; 
    console.log('PUT request for id', reqId);
    let sqlText = `UPDATE shopping_list SET purchased='true' WHERE id=$1;`;
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Item updated');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); 
        })
})


module.exports = router;
