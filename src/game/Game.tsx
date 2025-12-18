import {type FC, useMemo, useState} from "react";
import {BoardData, type SquareMark} from "../BoardData.ts";
import type {ITestLevel} from "../db.ts";
import {CluesWrapper} from "../components/CluesWrapper.tsx";
import {Board} from "../components/Board.tsx";
import {MarkSelector} from "../components/MarkSelector.tsx";
import {autoX, isEmptyMark} from "../Board.utils.ts";

export interface IGameProps {
    level: ITestLevel;
}

const Game: FC<IGameProps> = ({level}) => {
    const [playBoard, setPlayBoard] = useState<BoardData>(new BoardData(level.size, []));
    const [undoStack, setUndoStack] = useState<BoardData[]>([]);
    const [currentMark, setCurrentMark] = useState<SquareMark>('black');
    const [currentMoveMark, setCurrentMoveMark] = useState<SquareMark>('black');

    const solutionBoardData = useMemo(() => {
        return new BoardData(level.size, level.positions);
    }, [level]);

    const clues = useMemo(() => {
        return solutionBoardData.getClues();
    }, [solutionBoardData]);


    const onClickHandler = (row: number, col: number) => {
        const newBoard = playBoard.clone();
        if (playBoard.getSquare(row, col) === currentMark) {
            newBoard.setSquare(row, col, "white");
            setCurrentMoveMark('white');
        } else {
            newBoard.setSquare(row, col, currentMark);
            setCurrentMoveMark(currentMark);
        }

        if (!isEmptyMark(newBoard.getSquare(row, col))) {
            autoX(newBoard, row, col, clues);
        }
        setUndoStack([playBoard, ...undoStack]);
        setPlayBoard(newBoard);
    };

    const onMoveHandler = (row: number, col: number) => {
        if (playBoard.getSquare(row, col) !== currentMoveMark) {
            const newBoard = playBoard.clone();
            newBoard.setSquare(row, col, currentMoveMark);
            if (!isEmptyMark(currentMoveMark)) {
                autoX(newBoard, row, col, clues);
            }
            setUndoStack([playBoard, ...undoStack]);
            setPlayBoard(newBoard);
        }
    };


    return (<div>
        <h1>{level.name}</h1>
        <CluesWrapper squareSize={40} clues={clues}>
            <Board boardData={playBoard} squareSize={40} onClick={onClickHandler} onMove={onMoveHandler}></Board>
        </CluesWrapper>
        <MarkSelector initialState={'black'} allowedMarks={['black', 'X']} onChange={(mark) => {
            setCurrentMark(mark);
        }}></MarkSelector>
        <div>
            {undoStack.length && <button onClick={() => {
                if (undoStack.length > 0) {
                    setPlayBoard(undoStack[0]);
                    setUndoStack(undoStack.slice(1));
                }
            }}>Undo</button>}
            Undo stack has {undoStack.length} items
        </div>
    </div>);
}

export {Game};