import type {FC} from "react";
import {Square} from "./Square.tsx";
import type {BoardData} from "../BoardData.ts";

export interface BoardProps {
    boardData: BoardData
    onClick: (row: number, col: number) => void;
    onMove: (row: number, col: number) => void;
    squareSize: number;
}

const Board: FC<BoardProps> = ({boardData, onClick, onMove, squareSize}) => {
    const size = boardData.getSize();
    const rows = Array.from({length: size}, (_, row) =>
        Array.from({length: size}, (_, col) => ({row, col}))
    );

    return <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: `${squareSize * size}px`
    }}>

        {rows.map((row, rowIndex) =>
            row.map((_cell, colIndex) => (
                <Square
                    key={`${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    squareSize={squareSize}
                    boardSize={size}
                    mark={boardData.getSquare(rowIndex, colIndex) ?? 'white'}
                    onClick={(row, col) => {
                        onClick(row, col);
                    }}
                    onMove={(row, col) => {
                        onMove(row, col);
                    }}
                />
            ))
        )}
    </div>
}

export {Board};