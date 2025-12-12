import type {ClueNumberVector, SquareMark} from "../BoardData.ts";


export function generateRowPermutations(clues: ClueNumberVector, size: number): SquareMark[][] {
    const results: SquareMark[][] = [];
    const minSpace = clues.reduce((sum, clue) => sum + clue, 0) + clues.length - 1;

    if (minSpace > size) {
        return results;
    }

    function backtrack(index: number, position: number, current: SquareMark[]) {
        // Handle empty clues case (don't know if its legal)
        if (clues.length === 0) {
            return [Array(size).fill('X')];
        }

        //No more clues to process
        if (index === clues.length) {
            // Fill remaining cells with 'X'
            const result = [...current];
            for (let i = position; i < size; i++) {
                result[i] = 'X';
            }
            results.push(result);
            return;
        }


        const clue = clues[index];
        const remainingClues = clues.length - index - 1; //Each gap must be filled with 'X'
        const remainingSpace = clues.reduce((sum, c, i) => sum + i > index ? c : 0, 0) + remainingClues;

        for (let start = position; start <= (size - clue - remainingSpace); start++) {
            const next = [...current];

            // Fill with 'X' up to start position
            for (let i = position; i < start; i++) {
                next[i] = 'X';
            }

            // Place the black squares for current clue
            for (let i = start; i < start + clue; i++) {
                next[i] = 'black';
            }

            // Add mandatory gap after this clue (if not the last clue)
            if (index < clues.length - 1) {
                next[start + clue] = 'X';
                backtrack(index + 1, start + clue + 1, next);
            } else {
                backtrack(index + 1, start + clue, next);
            }
        }
    }


    backtrack(0, 0, []);
    return results;
}

export function filterPermutations(
    permutations: SquareMark[][],
    row: SquareMark[]
): SquareMark[][] {
    return permutations.filter(permutation => {
        // Check if this permutation matches the row
        for (let i = 0; i < row.length; i++) {
            const rowCell = row[i];
            const permCell = permutation[i];

            // 'white' means unmarked, so it can match any permutation cell
            if (rowCell === 'white') {
                continue;
            }

            // If the row has 'black' or 'X', the permutation must match exactly
            if (rowCell !== permCell) {
                return false;
            }
        }
        return true;
    });
}

export function generateConsensusRow(permutations: SquareMark[][]): SquareMark[] {
    if (permutations.length === 0) {
        return [];
    }

    const rowLength = permutations[0].length;
    const result: SquareMark[] = [];

    for (let i = 0; i < rowLength; i++) {
        // Get the value at position i from the first permutation
        const firstValue = permutations[0][i];
        let allMatch = true;

        // Check if all permutations have the same value at position i
        for (let j = 1; j < permutations.length; j++) {
            if (permutations[j][i] !== firstValue) {
                allMatch = false;
                break;
            }
        }

        // If all match, use that value; otherwise use 'white'
        result[i] = allMatch ? firstValue : 'white';
    }

    return result;
}
