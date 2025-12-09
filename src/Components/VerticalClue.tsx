import type {CSSProperties, FC} from "react";

const getFontSize = (count: number) => {
    if (count <= 2) return '16px';
    if (count <= 4) return '14px';
    if (count <= 6) return '12px';
    if (count <= 8) return '10px';
    return '10px';
};

// Calculate gap size based on number count
const getGap = (count: number) => {
    if (count <= 4) return '4px';
    if (count <= 6) return '2px';
    return '1px';
};

export interface IVerticalClueProps {
    numbers: number[]
}

const VerticalClue: FC<IVerticalClueProps> = ({numbers}) => {
    const containerStyle: CSSProperties = {
        width: '26px',
        height: '100px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        padding: '4px',
    };

    const numbersContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: getGap(numbers.length),
        fontWeight: 'bold',
        fontSize: getFontSize(numbers.length),
    };

    return (
        <div style={containerStyle}>
            <div style={numbersContainerStyle}>
                {numbers.map((num, idx) => (
                    <span key={idx}>{num}</span>
                ))}
            </div>
        </div>
    );
};

export {VerticalClue};