import {type FC, useState} from "react";
import {BoardData} from "../BoardData.ts";
import type {ILevel} from "../db.ts";
import {BoardWithClues} from "../Components/BoardWithClues.tsx";

export interface IGameProps {
    level: ILevel;
}

const Game: FC<IGameProps> = ({level}) => {

    const [board, setBoard] = useState<{ data: BoardData }>({data: new BoardData(level.size, level.positions)});

    return (<div>
        <h1>{level.name}</h1>
        <BoardWithClues squareSize={40} boardData={board.data} ></BoardWithClues>
    </div>);
}

export {Game};