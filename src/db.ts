import type {ITestLevel} from "./levels.ts";

export const Sun: ITestLevel = {
    name: "Sun",
    size: 5,
    positions: [
        [0, 2, "black"],
        [1, 1, "black"],
        [1, 2, "black"],
        [1, 3, "black"],
        [2, 0, "black"],
        [2, 1, "black"],
        [2, 3, "black"],
        [2, 4, "black"],
        [3, 1, "black"],
        [3, 2, "black"],
        [3, 3, "black"],
        [4, 2, "black"]
    ],
    clues: {
        rowClues: [[1], [3], [2, 2], [3], [1]],
        colClues: [[1], [3], [2, 2], [3], [1]],
    }
}

export const House: ITestLevel = {
    name: 'House',
    size: 10,
    positions: [[0, 4, "black"], [0, 5, "black"], [1, 3, "black"], [1, 6, "black"], [2, 1, "black"], [2, 2, "black"], [2, 3, "black"], [2, 6, "black"], [2, 7, "black"], [2, 8, "black"], [3, 0, "black"], [3, 4, "black"], [3, 5, "black"], [3, 9, "black"], [4, 0, "black"], [4, 1, "black"], [4, 2, "black"], [4, 3, "black"], [4, 6, "black"], [4, 7, "black"], [4, 8, "black"], [4, 9, "black"], [5, 0, "black"], [5, 4, "black"], [5, 5, "black"], [5, 9, "black"], [6, 0, "black"], [6, 3, "black"], [6, 6, "black"], [6, 9, "black"], [7, 0, "black"], [7, 3, "black"], [7, 6, "black"], [7, 9, "black"], [8, 0, "black"], [8, 3, "black"], [8, 6, "black"], [8, 9, "black"], [9, 0, "black"], [9, 1, "black"], [9, 2, "black"], [9, 3, "black"], [9, 4, "black"], [9, 5, "black"], [9, 6, "black"], [9, 7, "black"], [9, 8, "black"], [9, 9, "black"]],
    clues: {
        rowClues: [[2], [1, 1], [3, 3], [1, 2, 1], [4, 4], [1, 2, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [10]],
        colClues: [[7], [1, 1, 1], [1, 1, 1], [2, 1, 4], [1, 1, 1, 1], [1, 1, 1, 1], [2, 1, 4], [1, 1, 1], [1, 1, 1], [7]]
    }

}