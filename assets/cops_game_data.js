
let gameGraph0 = {
    // The vertices of the graph.
    vertices: [
        { x: 1, y: 1 },
        { x: 4, y: 1 },
        { x: 4, y: 4 },
        { x: 1, y: 4 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 5, y: 4 }, // idx=9
        { x: 0, y: 4 },
        { x: 5, y: 1 },
        { x: 0, y: 1 },
        { x: 5, y: 10 }, // idx=12
        { x: 0, y: 10 },
        { x: 1, y: 6 },
        { x: 4, y: 6 },
        { x: 4, y: 9 },
        { x: 1, y: 9 },
        { x: 2, y: 7 }, //idx=18
        { x: 3, y: 7 },
        { x: 3, y: 8 },
        { x: 2, y: 8 },
        { x: 5, y: 7 },
        { x: 0, y: 8 }
    ],
    // The edges of the graph, each edge is represented as the from and to vertex
    // index in the vertices array.
    edges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [2, 8], [1, 8], [0, 9], [3, 9],
        [8, 9, 0, 0.5],
        [1, 10], [0, 11], [10, 11, 0, -0.5],
        [8, 22], [22, 12], [12, 8, 0.5],
        [9, 23], [23, 13], [13, 9, -0.5], [12, 13],
        [14, 15], [15, 16], [16, 17], [17, 14],
        [9, 14], [8, 15], [16, 12], [17, 13],
        [18, 19], [19, 20], [20, 21], [21, 18],
        [14, 18], [15, 19], [16, 20], [17, 21],
    ],
    robber: 9,
    cops: [1, 2],
};

// A simple sqaure grid.
const gameGraph1Size = 9;
let gameGraph1 = {
    vertices: [],
    edges: [],
    robber: Math.floor(gameGraph1Size * gameGraph1Size / 2),
    cops: [0, gameGraph1Size - 1, gameGraph1Size * gameGraph1Size -1],
};
let gameGraph2 = {
    vertices: [],
    edges: [],
    robber: Math.floor(gameGraph1Size * gameGraph1Size / 2),
    cops: [0, gameGraph1Size - 1, gameGraph1Size * gameGraph1Size -1],
};
for (let r = 0; r < gameGraph1Size; r++) {
    for (let c = 0; c < gameGraph1Size; c++) {
        gameGraph1.vertices.push({ x : c, y : r });
        gameGraph2.vertices.push({ x : c, y : r });
        if (c != 0) {
            gameGraph1.edges.push([r * gameGraph1Size + c - 1, r * gameGraph1Size + c]);
            gameGraph2.edges.push([r * gameGraph1Size + c - 1, r * gameGraph1Size + c]);
        }
        if (r != 0) {
            gameGraph1.edges.push([(r - 1) * gameGraph1Size + c, r * gameGraph1Size + c]);
            gameGraph2.edges.push([(r - 1) * gameGraph1Size + c, r * gameGraph1Size + c]);
        }
        if (r != 0 && c != gameGraph1Size - 1) {
            gameGraph2.edges.push([(r - 1) * gameGraph1Size + c + 1, r * gameGraph1Size + c]);
        }
    }
}

let gameGraphs = [gameGraph0, gameGraph1, gameGraph2];