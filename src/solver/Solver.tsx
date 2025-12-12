import {type FC, useEffect, useState} from "react";
import {BoardData, type IRowColumnClues} from "../BoardData.ts";
import {CluesWrapper} from "../components/CluesWrapper.tsx";
import {Board} from "../components/Board.tsx";
import {cluesToBoard} from "../Board.utils.ts";

export interface ISolverProps {
    clues: IRowColumnClues
}

const Solver: FC<ISolverProps> = ({clues}) => {
    const size = clues.rowClues.length;
    const [board, setBoard] = useState<{
        data: BoardData
    }>({data: new BoardData(size, [])});

    useEffect(() => {
        const newBoard = cluesToBoard(clues);
        setBoard({data: newBoard});
    }, []);
    return (
        <div>
            <h1>Auto Solver</h1>
            <CluesWrapper clues={clues} squareSize={40}>
                <Board boardData={board.data} squareSize={40}></Board>
            </CluesWrapper>
        </div>
    );
}

export {Solver}