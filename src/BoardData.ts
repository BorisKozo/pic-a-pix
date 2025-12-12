export type SquareMark = 'white' | 'black' | 'X';

export type BoardPosition = [number, number, SquareMark];

export type ClueNumberVector = number[];
export type Clues = ClueNumberVector[];

export interface IRowColumnClues {
    rowClues: Clues;
    colClues: Clues;
}

export function SquareMarksToClueNumberVector(marks: SquareMark[]): ClueNumberVector {
    let counter = 0;
    const result: ClueNumberVector = [];
    for (let i = 0; i < marks.length; i++) {
        if ((marks[i] === 'white' || marks[i] === 'X') && counter > 0) {
            result.push(counter);
            counter = 0;
            continue;
        }
        if (marks[i] === 'black') {
            counter++;
            continue;
        }
    }
    if (counter > 0) {
        result.push(counter);
    }
    return result;
}


export class BoardData {
    size: number;
    board: SquareMark[][];

    constructor(size: number, positions: BoardPosition[]) {
        this.board = [];
        this.size = size;
        for (let i = 0; i < size; i++) {
            const row: SquareMark[] = [];
            for (let j = 0; j < size; j++) {
                row.push("white");
            }
            this.board.push(row);
        }

        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];
            const row = position[0];
            const col = position[1];
            const mark = position[2];
            if (row >= 0 && col >= 0 && row <= size && col <= size) {
                this.board[row][col] = mark;
            }
        }
    }

    getSize(): number {
        return this.size;
    }

    getSquare(row: number, column: number): SquareMark | undefined {
        return this.board[row][column];
    }

    getRow(row: number): SquareMark[] {
        return [...this.board[row]];
    }

    getCol(column: number): SquareMark[] {
        const result: SquareMark[] = [];
        for (let i = 0; i < this.size; i++) {
            result.push(this.board[i][column]);
        }
        return result;
    }

    setSquare(row: number, column: number, mark: SquareMark): void {
        if (row >= 0 && column >= 0 && row < this.size && column < this.size) {
            this.board[row][column] = mark;
        }
    }

    setRow(row: number, newRow: SquareMark[]): boolean {
        let changed = false;
        const existingRow = this.getRow(row);
        for (let i = 0; i < this.size; i++) {
            if (existingRow[i] !== newRow[i]) {
                changed = true;
                this.setSquare(row, i, newRow[i]);
            }
        }

        return changed;
    }

    setCol(col: number, newCol: SquareMark[]): boolean {
        let changed = false;
        const existingCol = this.getCol(col);
        for (let i = 0; i < this.size; i++) {
            if (existingCol[i] !== newCol[i]) {
                changed = true;
                this.setSquare(i, col, newCol[i]);
            }
        }

        return changed;
    }

    isEqual(otherBoard: BoardData): boolean {
        if (this.size !== otherBoard.size) {
            return false;
        }
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] !== otherBoard.getSquare(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }

    getTotalColored(): number {
        let count = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] !== 'X' && this.board[i][j] !== 'white') {
                    count++;
                }
            }
        }
        return count;
    }

    getClues(): IRowColumnClues {
        const rowClues: Clues = [];
        const columnClues: Clues = [];
        for (let i = 0; i < this.size; i++) {
            rowClues.push(SquareMarksToClueNumberVector(this.getRow(i)));
        }
        for (let i = 0; i < this.size; i++) {
            columnClues.push(SquareMarksToClueNumberVector(this.getCol(i)));
        }

        return {
            rowClues,
            colClues: columnClues
        }
    }

    getPositions(): BoardPosition[] {
        const result: BoardPosition[] = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] !== 'white') {
                    result.push([i, j, this.board[i][j]]);
                }
            }
        }
        return result;
    }
}