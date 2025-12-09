import {type FC, useMemo, useState} from "react";
import {BoardData} from "../BoardData.ts";
import type {ILevel} from "../db.ts";
import {CluesWrapper} from "../Components/CluesWrapper.tsx";
import {Board} from "../Components/Board.tsx";

export interface IGameProps {
    level: ILevel;
}

const Game: FC<IGameProps> = ({level}) => {
    const [playBoard, setPlayBoard] = useState<{ data: BoardData }>({data: new BoardData(level.size, [])});

    const solutionBoardData = useMemo(() => {
        return new BoardData(level.size, level.positions);
    }, [level]);

    const clues = useMemo(() => {
        return solutionBoardData.getClues();
    }, [solutionBoardData]);


    return (<div>
        <h1>{level.name}</h1>
        <CluesWrapper squareSize={40} clues={clues} boardSize={level.size}>
            <Board boardData={playBoard.data} squareSize={40} onClick={() => {
                console.log('Clicky');
            }}></Board>
        </CluesWrapper>
    </div>);
}

export {Game};