const fs = require('fs');
const words = require('./find_words').words;

// let file = fs.createWriteStream('all_words.txt');
// file.on('error', (err) => console.log("error occurred"));
// file.write(words.json());
// //words.forEach((word) => file.write(word + "\n"));
// file.end();

//https://stackoverflow.com/questions/51577849/how-to-save-an-array-of-strings-to-a-json-file-in-javascript
const jsonContent = JSON.stringify(words);

fs.writeFile("./all_words.json", jsonContent, 'utf8', function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});