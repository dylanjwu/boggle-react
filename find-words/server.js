const { json } = require('express');
const express = require('express');
const cors = require('cors');
require('nodemon');
const boggle = require('./find_words');
const { game } = require('./find_words');

const app = express();
app.use(cors());
const port = 3000

let game_info = { board: null, words: null };

app.get('/start_new_game', (req, res) => {
    game_info = boggle.game();
    console.log(`Starting new game: ${game_info}`);
})
app.get('/board', (req, res) => {
    game_info = boggle.game();
    console.log(`Starting new game: ${game_info.board}, ${game_info.words}`);
    res.send(game_info.board);
})
app.post('/check_word', (req, res) => {
    const containsWord = game_info.words !== null && game_info.words.includes(req);
    console.log(req);
    console.log(containsWord);
    res.send(containsWord);
})
app.get('/words', (req, res) => {
    console.log(req.body);
    res.send(game_info.words);
})
app.post('/store_game', (req, res) => {

})
app.delete('/remove_user', (req, res) => {

})
app.post('/store_user', (req, res) => {

})

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });