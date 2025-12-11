import {type CSSProperties, type FC, type PropsWithChildren} from "react";
import {HorizontalClue} from "./HorizontalClue";
import {VerticalClue} from "./VerticalClue";
import type {IRowColumnClues} from "../BoardData.ts";

export interface ICluesProps {
    clues: IRowColumnClues;
    squareSize: number;
}

const CluesWrapper: FC<PropsWithChildren<ICluesProps>> = ({clues, squareSize, children}) => {
    const boardSize = clues.rowClues.length;
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
        marginTop: '8px'
    };

    const boardPlaceholderStyle = {
        width: `${boardSize * squareSize}px`,
        height: `${boardSize * squareSize}px`,
    };

    return (
        <div style={containerStyle}>
            {/* Column clues at the top */}
            <div style={columnCluesContainerStyle}>
                {clues.colClues.map((clue, idx) => (
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
                    {children}
                </div>
            </div>
        </div>
    );
};

export {CluesWrapper};