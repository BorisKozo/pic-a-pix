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
    const [playBoard, setPlayBoard] = useState<{ data: BoardData }>({data: new BoardData(level.size, [])});
    const [currentMark, setCurrentMark] = useState<SquareMark>('black');
    const [currentMoveMark, setCurrentMoveMark] = useState<SquareMark>('black');

    const solutionBoardData = useMemo(() => {
        return new BoardData(level.size, level.positions);
    }, [level]);

    const clues = useMemo(() => {
        return solutionBoardData.getClues();
    }, [solutionBoardData]);


    const onClickHandler = (row: number, col: number) => {
        if (playBoard.data.getSquare(row, col) === currentMark) {
            playBoard.data.setSquare(row, col, "white");
            setCurrentMoveMark('white');
        } else {
            playBoard.data.setSquare(row, col, currentMark);
            setCurrentMoveMark(currentMark);
        }

        if (!isEmptyMark(playBoard.data.getSquare(row, col))) {
            autoX(playBoard.data, row, col, clues.rowClues[row], clues.colClues[col]);
        }
        setPlayBoard({data: playBoard.data});
    };

    const onMoveHandler = (row: number, col: number) => {
        if (playBoard.data.getSquare(row, col) !== currentMoveMark) {
            playBoard.data.setSquare(row, col, currentMoveMark);
            if (!isEmptyMark(currentMoveMark)) {
                autoX(playBoard.data, row, col, clues.rowClues[row], clues.colClues[col]);
            }
            setPlayBoard({data: playBoard.data});
        }
    };


    return (<div>
        <h1>{level.name}</h1>
        <CluesWrapper squareSize={40} clues={clues} boardSize={level.size}>
            <Board boardData={playBoard.data} squareSize={40} onClick={onClickHandler} onMove={onMoveHandler}></Board>
        </CluesWrapper>
        <MarkSelector initialState={'black'} allowedMarks={['black', 'X']} onChange={(mark) => {
            setCurrentMark(mark);
        }}></MarkSelector>
    </div>);
}

export {Game};