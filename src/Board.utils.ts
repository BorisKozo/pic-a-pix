import {BoardData, type ClueNumberVector, type SquareMark} from "./BoardData.ts";

export function isEmptyMark(mark: SquareMark | undefined): boolean {
    return mark === 'X' || mark === 'white';
}

export function isEqualColored(playBoard: BoardData, solutionBoard: BoardData): boolean {
    if (playBoard.getSize() !== solutionBoard.getSize()) {
        return false;
    }
    const size = playBoard.getSize();
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (playBoard.getSquare(i, j) !== 'X' && playBoard.getSquare(i, j) !== 'white' && playBoard.getSquare(i, j) !== solutionBoard.getSquare(i, j)) {
                return false;
            }
        }
    }
    return true;
}

export function autoX(playBoard: BoardData, row: number, col: number, rowClue: ClueNumberVector, colClue: ClueNumberVector) {
    const rowClueSum = rowClue.reduce((acc, x) => acc + x, 0);
    const colClueSum = colClue.reduce((acc, x) => acc + x, 0);
    let colSum = 0;
    let rowSum = 0;

    for (let i = 0; i < playBoard.getSize(); i++) {
        if (!isEmptyMark(playBoard.getSquare(row, i))) {
            rowSum += 1;
        }
        if (!isEmptyMark(playBoard.getSquare(i, col))) {
            colSum += 1;
        }
    }

    if (rowClueSum === rowSum) {
        for (let i = 0; i < playBoard.getSize(); i++) {
            if (playBoard.getSquare(row, i) === 'white') {
                playBoard.setSquare(row, i, 'X');
            }
        }
    }
    if (colClueSum === colSum) {
        for (let i = 0; i < playBoard.getSize(); i++) {
            if (playBoard.getSquare(i, col) === 'white') {
                playBoard.setSquare(i, col, 'X');
            }
        }
    }
}