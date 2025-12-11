import {type FC, useState} from "react";
import {BoardData, type IRowColumnClues} from "../BoardData.ts";
import {CluesWrapper} from "../components/CluesWrapper.tsx";
import {Board} from "../components/Board.tsx";

export interface ISolverProps {
    clues: IRowColumnClues
}

const Solver: FC<ISolverProps> = ({clues}) => {
        const [boardData, setBoardData] = useState<{
        data: BoardData
    }>({data: new BoardData(clues.rowClues.length, [])});

        return (
            <div>
                <h1>Auto Solver</h1>
                <CluesWrapper clues={clues} squareSize={40}>
                    <Board boardData={boardData.data} squareSize={40}></Board>
                </CluesWrapper>
            </div>
        );
}

export {Solver}