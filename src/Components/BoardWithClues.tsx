import {type CSSProperties, type FC, useMemo} from "react";
import {HorizontalClue} from "./HorizontalClue";
import {VerticalClue} from "./VerticalClue";
import type {BoardData} from "../BoardData.ts";
import {Board} from "./Board.tsx";

export interface ICluesProps {
    boardData: BoardData;
    squareSize: number;
}

const BoardWithClues: FC<ICluesProps> = ({boardData, squareSize}) => {
    const clues = useMemo(() => {
        return boardData.getClues();
    }, [boardData]);

    console.log(clues);
    const containerStyle = {
        display: 'inline-block',
        position: 'relative' as const,
    };

    const columnCluesContainerStyle: CSSProperties = {
        display: 'flex',
        gap: `${squareSize - 26}px`,
        marginBottom: '4px',
        marginLeft: '113px',
    };

    const rowAndGridContainerStyle = {
        display: 'flex',
    };

    const rowCluesContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: `${squareSize - 26}px`,
        marginRight: '4px',
        marginTop:'8px'
    };

    const boardPlaceholderStyle = {
        width: `${boardData.getSize() * squareSize}px`,
        height: `${boardData.getSize() * squareSize}px`,
    };

    return (
        <div style={containerStyle}>
            {/* Column clues at the top */}
            <div style={columnCluesContainerStyle}>
                {clues.columnClues.map((clue, idx) => (
                    <VerticalClue key={idx} numbers={clue}/>
                ))}
            </div>

            {/* Row clues on the left + board */}
            <div style={rowAndGridContainerStyle}>
                <div style={rowCluesContainerStyle}>
                    {clues.rowClues.map((clue, idx) => (
                        <HorizontalClue key={idx} numbers={clue}/>
                    ))}
                </div>

                {/* Placeholder for your Board component */}
                <div style={boardPlaceholderStyle}>
                    <Board boardData={boardData} squareSize={squareSize} onChange={() => {
                        console.log('onChange')
                    }}></Board>
                </div>
            </div>
        </div>
    );
};

export {BoardWithClues};