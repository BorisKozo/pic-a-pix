import {type FC, useEffect, useState} from "react";
import type {SquareMark} from "../BoardData.ts";
import {capitalize} from 'lodash';

export interface MarkSelectorProps {
    initialState: SquareMark;
    allowedMarks: SquareMark[];
    onChange: (mark: SquareMark) => void;
}

const MarkSelector: FC<MarkSelectorProps> = ({onChange, initialState, allowedMarks}) => {
    const [selected, setSelected] = useState<SquareMark>(initialState);

    useEffect(() => {
        onChange(selected);
    }, [selected])

    return (
        <div>
            {allowedMarks.map((mark: SquareMark) =>
                (<label key={mark}>
                    <input
                        type="radio"
                        value={mark}
                        checked={selected === mark}
                        onChange={(e) => setSelected(e.target.value as SquareMark)}
                    />
                    {capitalize(mark)}
                </label>))
            }
        </div>
    );
}

export {MarkSelector};