const isWord = require('is-word');
const englishWords = isWord('american-english');

class Graph {
    constructor(vertices) {
        this.numberVerts = vertices;
        this.map = new Map();
    }
    addVertex(v) {
        this.map.set(v, []);
    }
    getEdges(v) {
        return this.map.get(v);
    }
    addEdge(v, w) {
        this.map.get(v).push(w);
    }
}

class Board {
    constructor() {
        this.board = this.generateRandomBoard();
        this.words = [];
        this.graph = this.getAdjList();
    }
    generateRandomBoard() {
        const LETTERS = "WODSENAATIOCILWGURGLEYKUDZANVEARSELCESPLUTAQOMBJTBYAILPECAMDORIFXBKOTUDNPINESHVITEGNASOHRMHEFIYE";
        let board = [];
        for (let i = 0; i < 4; i++) {
            let temp = [];
            for (let j = 0; j < 4; j++) {
                let rand_ch = LETTERS[Math.floor(Math.random() * LETTERS.length)];
                temp.push(rand_ch == "Q" ? "Qu" : rand_ch);
            }
            board.push(temp);
        }
        return board;
    }
    addEdges(graph, i, j) {
        let num = ((4 * i) + j);
        let above = num - 4;
        let below = num + 4;
        graph.addVertex(num)
        if (i > 0) graph.addEdge(num, above);
        if (j > 0) graph.addEdge(num, num - 1);
        if (i < 3) graph.addEdge(num, below);
        if (j < 3) graph.addEdge(num, num + 1);
        if (j < 3 && i < 3) graph.addEdge(num, below + 1);
        if (j < 3 && i > 0) graph.addEdge(num, above + 1);
        if (j > 0 && i < 3) graph.addEdge(num, below - 1);
        if (j > 0 && i > 0) graph.addEdge(num, above - 1);
    }
    getAdjList() {
        let graph = new Graph(16);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.addEdges(graph, i, j);
            }
        }
        return graph;
    }
    findAllWords(start) {
        const graph = this.graph;
        const board = this.board;
        let words = this.words;
        (function getWords(word, v, visited) {
            if (word.length > 2) {
                let stringWord = word.map((n) =>
                    board[Math.floor(n / 4)][n % 4].toLowerCase()).join("");
                if (englishWords.check(stringWord) && !words.includes(stringWord)) {
                    words.push(stringWord);
                }
            }
            graph.getEdges(v).forEach(function(u) {
                if (!visited[u]) {
                    let visitedCopy = [...visited];
                    visitedCopy[u] = true;
                    getWords([u, ...word], u, visitedCopy);
                }
            });
        })([], start, new Array(graph.numberVerts).fill(false));
    }
    getAllWords() {
        for (let i = 0; i < this.graph.numberVerts; i++) {
            this.findAllWords(i);
        }
        return this.words.sort((a, b) => a[0] > b[0]);
    }
}

const game = function() {
    const boggleBoard = new Board();
    return { board: boggleBoard.board, words: boggleBoard.getAllWords() };
}
const g = game();
const board = g.board;
const words = g.words;
console.log(board);
console.log(words);

module.exports = {
    game: game,
};