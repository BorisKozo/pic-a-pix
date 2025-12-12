import type {BoardPosition, IRowColumnClues} from "./BoardData.ts";

export interface ILevel {
    name: string;
    size: number;
    clues: IRowColumnClues;
}

export interface ITestLevel extends ILevel {
    positions: BoardPosition[];
}

export interface ILevelMap {
    [key: string]: ILevel;
}

export const levels: ILevelMap = {
    hard1: {
        name: 'Hard 1',
        size: 15,
        clues: {
            rowClues: [
                [5], [2, 3], [1, 2], [4, 4], [1, 1, 1], [1, 3, 1], [3, 4], [4, 4], [1, 1, 5], [6, 4], [1, 8], [2, 3, 6], [5, 5], [3, 3, 4], [3, 1, 2, 4]
            ],
            colClues: [
                [1, 3], [1, 1, 4], [1, 6], [5, 1, 1], [3, 4, 2], [2, 1, 1, 3, 1], [1, 1, 1, 4, 1], [1, 2, 2, 1, 1], [2, 1, 7, 2], [4, 6, 1], [3, 7], [4, 6], [5], [4], [3]
            ]
        }
    }

}