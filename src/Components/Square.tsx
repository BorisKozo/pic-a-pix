import type {CSSProperties, FC} from "react";
import type {SquareMark} from "../BoardData.ts";

export interface SquareProps {
    mark: SquareMark;
    squareSize: number;
    boardSize: number;
    row: number;
    col: number;

    onClick(row: number, col: number): void
}

//border:  '1px solid black',
const BORDER_TYPE = 'solid black';

function leftBorderFromCol(col: number): string {
    if (col === 0) {
        return '2px';
    }
    if (col % 5 === 0) {
        return '2px';
    }
    return '1px';
}

function rightBorderFromCol(col: number, boardSize: number): string {
    if (col === boardSize - 1) {
        return '2px';
    }
    return '0px';
}

function topBorderFromRow(row: number): string {
    if (row === 0) {
        return '2px';
    }
    if (row % 5 === 0) {
        return '2px';
    }
    return '1px';
}

function bottomBorderFromRow(row: number, boardSize: number): string {
    if (row === boardSize - 1) {
        return '2px';
    }
    return '0px';
}


const Square: FC<SquareProps> = ({mark, squareSize, boardSize, row, col, onClick}) => {
    const bgColor = mark === 'black' ? 'black' : 'white';
    const borderLeft = `${leftBorderFromCol(col)} ${BORDER_TYPE}`;
    const borderRight = `${rightBorderFromCol(col, boardSize)} ${BORDER_TYPE}`;
    const borderTop = `${topBorderFromRow(row)} ${BORDER_TYPE}`;
    const borderBottom = `${bottomBorderFromRow(row, boardSize)} ${BORDER_TYPE}`;

    const squareStyle: CSSProperties = {
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        backgroundColor: bgColor,
        borderLeft,
        borderRight,
        borderTop,
        borderBottom,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
    }
    return <div style={squareStyle}
                onMouseMove={(e) => {
                    if (e.buttons === 1) {
                        onClick(row, col);
                    }
                }}
                onMouseDown={() => onClick(row, col)}
    >
        {mark === 'X' &&
            <div style={{
                fontSize: `${squareSize}px`
            }}>
                X
            </div>}
    </div>
}

export {Square};