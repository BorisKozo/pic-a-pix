import {type FC, useEffect, useState} from "react";
import {BoardData, type IRowColumnClues} from "../BoardData.ts";
import {CluesWrapper} from "../components/CluesWrapper.tsx";
import {Board} from "../components/Board.tsx";
import {filterPermutations, generateConsensusRow, generateRowPermutations} from "./Solver.utils.ts";

export interface ISolverProps {
    clues: IRowColumnClues
}

const Solver: FC<ISolverProps> = ({clues}) => {
    const size = clues.rowClues.length;
    const [board, setBoard] = useState<{
        data: BoardData
    }>({data: new BoardData(size, [])});

    useEffect(() => {
        let masterChanged = true;
        while (masterChanged) {
            masterChanged = false;
            for (let i = 0; i < size; i++) {
                const row = board.data.getRow(i);
                const cluesOfRow = clues.rowClues[i];
                let permutations = generateRowPermutations(cluesOfRow, size);
                permutations = filterPermutations(permutations, row);
                const newRow = generateConsensusRow(permutations);
                const isChanged = board.data.setRow(i, newRow);
                masterChanged = masterChanged || isChanged;
            }

            for (let i = 0; i < size; i++) {
                const col = board.data.getCol(i);
                const cluesOfCol = clues.colClues[i];
                let permutations = generateRowPermutations(cluesOfCol, size);
                permutations = filterPermutations(permutations, col);
                const newCol = generateConsensusRow(permutations);
                const isChanged = board.data.setCol(i, newCol);
                masterChanged = masterChanged || isChanged;
            }
        }

        setBoard({data:board.data});
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