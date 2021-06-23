const LETTERS = "WODSENAATIOCILWGURGLEYKUDZANVEARSELCESPLUTAQOMBJTBYAILPECAMDORIFXBKOTUDNPINESHVITEGNASOHRMHEFIYE";

class Graph {
    constructor(vertices) {
        this.numberVerts = vertices;
        this.list = new Map();
    }
    addVertex(v) {
        this.list.set(v, []);
    }
    addEdge(v, w) {
        this.list.get(v).push(w);
    }
    printGraph() {
        let vertices = this.adjList.keys();

        for (let vert of vertices) {
            let neighbors = this.list.get(i);
            let neighbor_str = "";
            for (let neighbor of neighbors) {
                neighbor_str += neighbor + " ";
            }
            console.log(vert + "->" + neighbor_str);
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
        let graph = new Graph(96);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.addEdges(graph, i, j);
            }
        }
        return graph;
    }

    getAllWords() {
        var allWords = [];
        const v_num = this.graph.numberVerts;
        for (let i = 0; i < v_num; i++) {
            let visited = new Array(this.v_num).fill(false);
            //allWords.concat([this.getWords(i, visited).map((arr) => [i, arr])]);
            allWords.concat([this.getWords(i, visited)]);
        }
        return allWords;
    }

    getWords(v, visited) {
        var result = [];
        if (this.graph.list.get(v).reduce((a, b) => a && visited[b])) {
            return [
                []
            ];
        }

        for (let u of this.graph.list.get(v)) {
            if (!visited[u]) {
                visited[u] = true;
                let words = this.getWords(u, visited);
                words.forEach((word) => word.push(v));
                result.concat([...words]);
            }
            result.concat([]);
        }
        return result;
    }

}

const board = new Board();