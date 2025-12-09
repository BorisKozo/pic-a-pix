export type SquareMark = 'white' | 'black' | 'X';

export type BoardPosition = [number, number, SquareMark];

export type ClueNumberVector = number[];
export type Clues = ClueNumberVector[];

export interface IRowColumnClues {
    rowClues: Clues;
    columnClues: Clues;
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

    private getRow(row: number): SquareMark[] {
        return [...this.board[row]];
    }

    private getColumn(column: number): SquareMark[] {
        const result: SquareMark[] = [];
        for (let i = 0; i < this.size; i++) {
            result.push(this.board[i][column]);
        }
        return result;
    }

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

    setSquare(row: number, column: number, mark: SquareMark): void {
        if (row >= 0 && column >= 0 && row < this.size && column < this.size) {
            this.board[row][column] = mark;
        }
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

    getClues(): IRowColumnClues {
        const rowClues: Clues = [];
        const columnClues: Clues = [];
        for (let i = 0; i < this.size; i++) {
            rowClues.push(SquareMarksToClueNumberVector(this.getRow(i)));
        }
        for (let i = 0; i < this.size; i++) {
            columnClues.push(SquareMarksToClueNumberVector(this.getColumn(i)));
        }

        return {
            rowClues,
            columnClues
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