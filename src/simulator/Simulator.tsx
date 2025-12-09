import {type FC, useEffect, useState} from "react";
import {MAX_BOARD_SIZE, MIN_BOARD_SIZE} from "../consts.ts";
import {Board} from "../Components/Board.tsx";
import {MarkSelector} from "../Components/MarkSelector.tsx";
import {BoardData, type SquareMark} from "../BoardData.ts";

const Simulator: FC = () => {
    const [size, setSize] = useState(10);
    const [currentMark, setCurrentMark] = useState<SquareMark>('black');
    const [boardData, setBoardData] = useState<{ data: BoardData }>({data: new BoardData(size, [])});
    const [positions, setPositions] = useState<string>(JSON.stringify([]));

    useEffect(() => {
        setBoardData({data: new BoardData(size, [])});
    }, [size]);

    useEffect(() => {
        setPositions(JSON.stringify(boardData.data.getPositions()));
    }, [boardData]);

    return <div style={{
        padding: '10px'
    }}>
        <section style={{
            margin: '5px'
        }}>
            <div>Size :</div>
            <input type={'number'} min={MIN_BOARD_SIZE} max={MAX_BOARD_SIZE} value={size} onChange={(event) => {
                const numericValue = Number(event.target.value);
                if (numericValue >= MIN_BOARD_SIZE && numericValue <= MAX_BOARD_SIZE) {
                    setSize(numericValue);
                }
            }}/>
        </section>
        <Board squareSize={40} boardData={boardData.data} onChange={(row, col) => {
            boardData.data.setSquare(row, col, currentMark);
            setBoardData({data: boardData.data});

        }}></Board>
        <MarkSelector initialState={'black'} onChange={(mark) => {
            setCurrentMark(mark);
        }}></MarkSelector>
        <section>
            <div>Positions:</div>
            <textarea readOnly={true} value={positions} style={{
                width: '100%',
                minHeight: '200px'
            }}/>
        </section>
    </div>
}

export {Simulator};