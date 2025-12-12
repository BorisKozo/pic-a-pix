import {BoardData, type ClueNumberVector, type IRowColumnClues, type SquareMark} from "./BoardData.ts";
import {filterPermutations, generateConsensusRow, generateRowPermutations} from "./solver/Solver.utils.ts";

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

// Validation function: Check if a row or col is a valid solution for given clues
export function isValidSolution(rowOrCol: SquareMark[], clues: ClueNumberVector): boolean {
    // Extract consecutive black groups from the row
    const groups: number[] = [];
    let currentGroupSize = 0;

    for (let i = 0; i < rowOrCol.length; i++) {
        if (rowOrCol[i] === 'black') {
            currentGroupSize++;
        } else {
            // End of a black group (either 'X' or 'white')
            if (currentGroupSize > 0) {
                groups.push(currentGroupSize);
                currentGroupSize = 0;
            }
        }
    }

    // Don't forget the last group if row ends with black
    if (currentGroupSize > 0) {
        groups.push(currentGroupSize);
    }

    // Compare groups with clues
    if (groups.length !== clues.length) {
        return false;
    }

    for (let i = 0; i < groups.length; i++) {
        if (groups[i] !== clues[i]) {
            return false;
        }
    }

    return true;
}

function autoXSingleRowOrCol(rowOrCol: SquareMark[], clues: ClueNumberVector): SquareMark[] {
    const clueSum = clues.reduce((acc, x) => acc + x, 0);
    let sum = 0;
    const result = [...rowOrCol];

    for (let i = 0; i < rowOrCol.length; i++) {
        if (!isEmptyMark(rowOrCol[i])) {
            sum += 1;
        }
    }

    if (clueSum === sum) {
        for (let i = 0; i < rowOrCol.length; i++) {
            if (rowOrCol[i] === 'white') {
                result[i] = 'X';
            }
        }
    }
    return result;
}

export function autoX(board: BoardData, row: number, col: number, clues: IRowColumnClues) {
    const currentRow = board.getRow(row);
    if (isValidSolution(currentRow, clues.rowClues[row])) {
        const xedRow = autoXSingleRowOrCol(currentRow, clues.rowClues[row]);
        board.setRow(row, xedRow);
    }
    const currentCol = board.getCol(col);
    if (isValidSolution(currentCol, clues.colClues[col])) {
        const xedCol = autoXSingleRowOrCol(currentCol, clues.colClues[col]);
        board.setCol(col, xedCol);
    }
}

export function cluesToBoard(clues: IRowColumnClues): BoardData {
    const size = clues.colClues.length;
    const result = new BoardData(size, []);
    let masterChanged = true;
    while (masterChanged) {
        masterChanged = false;
        for (let i = 0; i < size; i++) {
            const row = result.getRow(i);
            const cluesOfRow = clues.rowClues[i];
            let permutations = generateRowPermutations(cluesOfRow, size);
            permutations = filterPermutations(permutations, row);
            const newRow = generateConsensusRow(permutations);
            const isChanged = result.setRow(i, newRow);
            masterChanged = masterChanged || isChanged;
        }

        for (let i = 0; i < size; i++) {
            const col = result.getCol(i);
            const cluesOfCol = clues.colClues[i];
            let permutations = generateRowPermutations(cluesOfCol, size);
            permutations = filterPermutations(permutations, col);
            const newCol = generateConsensusRow(permutations);
            const isChanged = result.setCol(i, newCol);
            masterChanged = masterChanged || isChanged;
        }
    }
    return result;
}