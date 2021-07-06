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
    printGraph() {
        for (let i = 0; i < this.numberVerts; i++) {
            let neighbors = this.map.get(i);
            console.log(neighbors);
            let neighbor_str = "";
            for (let neighbor of neighbors) {
                neighbor_str += neighbor + " ";
            }
            console.log(i + "->" + neighbor_str);
        }
    }
}

class Board {
    constructor() {
        this.board = this.generateRandomBoard();
        this.words = {};
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
    findAllWords(v) {
        let allWords = [];
        const graph = this.graph;
        const board = this.board;

        (function getWords(word, visited) {

            if (word.length > 2) {
                let stringWord = word.map((n) =>
                    board[Math.floor(n / 4)][n % 4].toLowerCase()).join("");
                if (englishWords.check(stringWord) && !allWords.includes(stringWord))
                    allWords.push(stringWord);
            }

            graph.getEdges(v).forEach(function(u) {
                if (!visited[u]) {
                    let visitedCopy = [...visited];
                    visitedCopy[u] = true;
                    getWords([u, ...word], visitedCopy);
                }
            });

        })([], new Array(graph.numberVerts).fill(false));

        return allWords;
    }
    getAllWords() {
        let allWords = []
        for (let i = 0; i < this.graph.numberVerts; i++) {
            allWords = allWords.concat(this.findAllWords(i));
        }

        return allWords;
    }
}

let boggleBoard = new Board();
module.exports = {
    board: boggleBoard.board,
    words: boggleBoard.getAllWords()
};