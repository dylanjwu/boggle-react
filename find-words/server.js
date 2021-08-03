const { json } = require('express');
const express = require('express')
const boggle = require('./find_words');

const app = express()
const port = 3000

app.get('/board', (req, res) => {
    res.send(boggle.board);
})
app.get('/words', (req, res) => {
    res.send(boggle.words);
})
app.post('/store_game', (req, res) => {

})
app.delete('/remove_user', (req, res) => {

})
app.post('/store_user', (req, res) => {

})

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });