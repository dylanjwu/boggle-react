const LETTERS = "WODSENAATIOCILWGURGLEYKUDZANVEARSELCESPLUTAQOMBJTBYAILPECAMDORIFXBKOTUDNPINESHVITEGNASOHRMHEFIYE";

class Graph {
    constructor(vertices) {
        this.numberVerts = vertices;
        this.map = new Map();
    }
    addVertex(v) {
        this.map.set(v, []);
    }
    addEdge(v, w) {
        this.map.get(v).push(w);
    }
    replaceEdgeList(v, newList) {
        this.map.set(v, newList);
    }
    printGraph() {
        let vertices = this.adjList.keys();

        for (let vert of vertices) {
            let neighbors = this.map.get(i);
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
            allWords.concat([this.getWords(i, Object.assign(this.graph.map)]);
            }
            return allWords;
        }

        getWords(v, graph) {
            var result = [];

            //base case: all neighbors
            if (graph.get(v).length <= 0) {
                return [
                    []
                ];
            }

            for (let u of graph.get(v)) {

                // remove v vertex from u's neighbor list
                let newList = graph.get(u).slice().filter(el => el != v);
                graph.replaceEdgeList(u, newList);

                let words = this.getWords(u);
                words.forEach((word) => word.push(u));
                result.concat([...words]);
            }
            result.push([]);

            return result;
        }
    }

    const board = new Board();
    console.log(board.getAllWords());