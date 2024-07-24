import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * Combines class names using `clsx` and `twMerge` for optimized className merging.
 * @param inputs - Array of class values to be merged.
 * @returns A single string with combined and deduplicated class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


/**
 * Handles the logic for arrow key presses, updating the game state.
 * @param gameMatrix - Current state of the game matrix.
 * @param key - The arrow key pressed ('up', 'down', 'left', 'right').
 * @param setGameMatrix - Function to update the game matrix.
 * @param setJustGenerated - Function to mark newly generated tiles.
 * @param setJustMergedMatrix - Function to mark newly merged tiles.
 * @param setCurrentScore - Function to update the current score.
 * @param setHighScore - Function to update the high score.
 * @param currentScore - Current game score.
 * @returns A boolean indicating if the game is over.
 */
export function handleArrowKey(gameMatrix: number[][], key: string,
                               setGameMatrix: Function,
                               setJustGenerated: Function,
                               setJustMergedMatrix: Function,
                               setCurrentScore: Function,
                               setHighScore: Function,
                               currentScore: number): boolean {
    const intermediateJustMergedMatrix = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ]

    let trackedScore = currentScore;

    // Block merging
    console.log("Current score passed to util: " + currentScore);

    // Initialise updated matrix to return, gridSize, and map to prevent single-move remerging
    const previousMatrix = gameMatrix.map(row => [...row]);
    let newMatrix = [...gameMatrix];

    const gridSize = newMatrix.length;
    const justFormedMap : Map<string,boolean> = new Map();

    // Initialise map with falses for all cells
    for (let i = 0; i<gridSize; i++) {
        for (let j = 0 ; j<gridSize; j++) {
            justFormedMap.set(`${i},${j}`, false);
        }
    }

    const isHorizontal = key === "right" || key === "left";
    const isForward = key === "right" || key === "down";

    for (let outerIndex = 0; outerIndex < gridSize; outerIndex++) {

        // Generic Loop Header
        const scanningLoopStart = isForward ? gridSize - 1 : 0;
        const scanningLoopEnd = isForward ? 0 : gridSize;
        const scanningLoopIncrement = isForward ? -1 : 1;

        for (let innerIndex =  scanningLoopStart; isForward? innerIndex >= scanningLoopEnd : innerIndex < scanningLoopEnd; innerIndex += scanningLoopIncrement) {
            const columnIndex = isHorizontal ? innerIndex: outerIndex;
            const rowIndex = isHorizontal ? outerIndex: innerIndex;

            // Generic Block Movement Direction
            const movementLoopStart = isHorizontal ? columnIndex : rowIndex;
            const movementLoopEnd = isForward ? gridSize - 1 : 0;
            const movementLoopIncrement = isForward ? 1 : -1;

            let pointsGainedFromThisMove = 0;

            for (let movementCheckerIndex = movementLoopStart;
                 isForward ? movementCheckerIndex < movementLoopEnd : movementCheckerIndex > movementLoopEnd;
                 movementCheckerIndex += movementLoopIncrement) {
                // Generic Ahead-Check
                const indexAhead = movementCheckerIndex + (isForward ? 1 : -1);

                // Right/Left Block Shifting Logic
                if (isHorizontal && newMatrix[rowIndex][indexAhead] === 0 && newMatrix[rowIndex][movementCheckerIndex] !== 0) {
                    const cellValue = newMatrix[rowIndex][movementCheckerIndex];

                    newMatrix[rowIndex][movementCheckerIndex] = 0;
                    newMatrix[rowIndex][indexAhead] = cellValue;
                }
                // Up/Down Block Shifting Logic
                if (!isHorizontal && newMatrix[indexAhead][columnIndex] === 0 && newMatrix[movementCheckerIndex][columnIndex] !== 0) {
                    const cellValue = newMatrix[movementCheckerIndex][columnIndex];

                    newMatrix[movementCheckerIndex][columnIndex] = 0;
                    newMatrix[indexAhead][columnIndex] = cellValue;
                }

                // Right/Left Arrow Merge
                if (isHorizontal && !justFormedMap.get(`${rowIndex},${indexAhead}`)
                    && !justFormedMap.get(`${rowIndex},${movementCheckerIndex}`)
                    && newMatrix[rowIndex][movementCheckerIndex] === newMatrix[rowIndex][indexAhead]
                    && newMatrix[rowIndex][movementCheckerIndex] !== 0) {

                    newMatrix[rowIndex][movementCheckerIndex] = 0;
                    newMatrix[rowIndex][indexAhead] *= 2;
                    justFormedMap.set(`${rowIndex},${indexAhead}`, true);
                    intermediateJustMergedMatrix[rowIndex][indexAhead] = true;

                    setGameMatrix(newMatrix);

                    pointsGainedFromThisMove += newMatrix[rowIndex][indexAhead];
                }

                // Down/Up Arrow Merge
                if (!isHorizontal && !justFormedMap.get(`${indexAhead},${columnIndex}`)
                    && !justFormedMap.get(`${movementCheckerIndex},${columnIndex}`)
                    && newMatrix[movementCheckerIndex][columnIndex] === newMatrix[indexAhead][columnIndex]
                    && newMatrix[movementCheckerIndex][columnIndex] !== 0) {

                    newMatrix[movementCheckerIndex][columnIndex] = 0;
                    newMatrix[indexAhead][columnIndex] *= 2;
                    justFormedMap.set(`${indexAhead},${columnIndex}`, true);
                    intermediateJustMergedMatrix[indexAhead][columnIndex] = true;

                    setGameMatrix(newMatrix);

                    pointsGainedFromThisMove += newMatrix[indexAhead][columnIndex];
                }
            }
            trackedScore += pointsGainedFromThisMove
            if (pointsGainedFromThisMove > 0) {
                setCurrentScore( (oldScore: number) => oldScore + pointsGainedFromThisMove)
                setHighScore ((oldHighScore: number) => {
                    return trackedScore > oldHighScore ? trackedScore : oldHighScore
                })
                setJustMergedMatrix(intermediateJustMergedMatrix.map(arr => [...arr]));
            }
        }
    }
    newMatrix = generateNewTile(previousMatrix, newMatrix, setJustGenerated);
    return isGameOver(newMatrix);
}


/**
 * Generates a fresh game matrix with initial random tiles for the game start.
 * @param gridSize - The size of the grid.
 * @returns A new game matrix initialized with two random tiles.
 */
export function getFreshMatrix(gridSize: number): number[][] {
    const startingSlotIndices: number[] = [];

    const firstRandomNumber = getRandomNumber(gridSize)
    startingSlotIndices.push(firstRandomNumber);
    for (let i = 0; i<gridSize/2 - 1; i++) {
        let newRandomNumber = firstRandomNumber;
        while (startingSlotIndices.includes(newRandomNumber)) {
            newRandomNumber = getRandomNumber(gridSize);
        }
        startingSlotIndices.push(newRandomNumber);
    }
    const gameMatrix: number[][] = [];

    let slotIndex = 0;
    for (let i = 0; i<gridSize; i++) {
        gameMatrix[i] = new Array(gridSize);
        for (let j = 0; j<gridSize; j++) {
            if (startingSlotIndices.includes(slotIndex)) {
                gameMatrix[i][j] = Math.random() < 0.5 ? 3: 6;
            }
            else {
                gameMatrix[i][j] = 0;
            }
            slotIndex++;
        }
    }
    return gameMatrix;
}

/**
 * Internal function to generate a random index based on the grid size.
 * @param gridSize - The size of the grid.
 * @returns A random index within the grid boundaries.
 */
function getRandomNumber(gridSize: number) {
    return Math.floor(Math.random() * (Math.pow(gridSize, 2) - 1));
}


/**
 * Adds a new tile to the game matrix if there has been a change.
 * @param previousMatrix - The previous state of the game matrix.
 * @param newMatrix - The current state of the game matrix.
 * @param setJustGenerated - Function to mark newly generated tiles.
 * @returns The updated game matrix.
 */
function generateNewTile(previousMatrix: number[][], newMatrix: number[][], setJustGenerated: Function) {
    const gridSize = newMatrix.length;

    if (!matrixHasChanged(previousMatrix, newMatrix)) {
        return newMatrix;
    }
    const vacantSlots: number[] = [];

    let slotIndex = 0;

    for (let i = 0; i<gridSize; i++) {
        for (let j = 0; j<gridSize; j++){
            if (newMatrix[i][j] === 0) {
                vacantSlots.push(slotIndex);
            }
            slotIndex++;
        }
    }

    const newTileIndex: number = vacantSlots[Math.floor(Math.random() * (vacantSlots.length - 1))];

    let idx = 0;


    const intermediateJustGeneratedMatrix = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ]

    for (let i = 0; i<gridSize; i++) {
        for (let j = 0; j<gridSize; j++){
            if (idx === newTileIndex) {
                newMatrix[i][j] = 3;
                intermediateJustGeneratedMatrix[i][j] = true;
            }
            idx++;
        }
    }
    setJustGenerated(intermediateJustGeneratedMatrix.map(arr => [...arr]));

    return newMatrix;
}


/**
 * Checks if two matrices are different.
 * @param matrix1 - The first matrix to compare.
 * @param matrix2 - The second matrix to compare.
 * @returns A boolean indicating if there is any difference between the two matrices.
 */
function matrixHasChanged(matrix1: number[][], matrix2: number[][]): boolean {
    for (let i = 0; i<matrix1.length; i++) {
        for (let j = 0; j< matrix1.length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return true;
            }
        }
    }
    return false;
}


/**
 * Checks if the game is over by looking for available moves or empty cells.
 * @param matrix - The current game matrix.
 * @returns A boolean indicating if no moves are left, hence the game is over.
 */
function isGameOver(matrix: number[][]): boolean {
    const filteredMatrix = (matrix.map(arr => {
        return arr.filter(cellValue => cellValue === 0)
    }))
    for (let rowIndex = 0; rowIndex<filteredMatrix.length; rowIndex++) {
        if (filteredMatrix[rowIndex].length !== 0) {
            return false;
        }
    }
    return !validMoveIsPossible(matrix);
}


/**
 * Determines if there is at least one valid move possible on the board.
 * @param matrix - The matrix to check for possible moves.
 * @returns A boolean indicating if a valid move exists.
 */
function validMoveIsPossible(matrix: number[][]) {
    for (let i = 0; i<matrix.length; i++) {
        for (let j = 0; j<matrix.length; j++) {
            const focusCell = matrix[i][j];
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

            for (let [dx, dy] of directions) {
                let newI = i + dx;
                let newJ = j + dy;

                if (newI >= 0 && newI < matrix.length && newJ >= 0 && newJ < matrix[0].length) {
                    if (matrix[newI][newJ] === focusCell) {
                        return true;
                    }
                }
            }

        }
    }
    return false;
}
