import {type FC, useEffect, useState} from "react";
import type {SquareMark} from "../BoardData.ts";

export interface MarkSelectorProps {
    initialState: SquareMark;
    onChange: (mark: SquareMark) => void;
}

const MarkSelector: FC<MarkSelectorProps> = ({onChange, initialState}) => {
    const [selected, setSelected] = useState<SquareMark>(initialState);

    useEffect(() => {
        onChange(selected);
    }, [selected])

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value='X'
                    checked={selected === 'X'}
                    onChange={(e) => setSelected(e.target.value as SquareMark)}
                />
                X
            </label>

            <label>
                <input
                    type="radio"
                    value="black"
                    checked={selected === 'black'}
                    onChange={(e) => setSelected(e.target.value as SquareMark)}
                />
                Black
            </label>

            <label>
                <input
                    type="radio"
                    value="white"
                    checked={selected === 'white'}
                    onChange={(e) => setSelected(e.target.value as SquareMark)}
                />
                White
            </label>

            <p>Selected: {selected}</p>
        </div>
    );
}

export {MarkSelector};