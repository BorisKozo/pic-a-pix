import type {CSSProperties, FC} from "react";

const getFontSize = (count: number) => {
    if (count <= 2) return '18px';
    if (count <= 4) return '16px';
    if (count <= 6) return '14px';
    if (count <= 8) return '12px';
    return '10px';
};

// Calculate gap size based on number count
const getGap = (count: number) => {
    if (count <= 4) return '4px';
    if (count <= 6) return '2px';
    return '1px';
};

export interface IHorizontalClueProps {
    numbers: number[]
}

const HorizontalClue: FC<IHorizontalClueProps> = ({numbers}) => {
    const containerStyle: CSSProperties = {
        width: '100px',
        height: '26px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'lightgray',
        padding: '8px',
    };

    const numbersContainerStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        lineHeight:'1',
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

export {HorizontalClue};