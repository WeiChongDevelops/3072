export function handleArrowKey(gameMatrix: number[][], key: string,
                               setGameMatrix: Function,
                               setJustGenerated: Function,
                               setJustMergedMatrix: Function,
                               setCurrentScore: Function,
                               setHighScore: Function,
                               currentScore: number) {
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

export function getFreshMatrix(gridSize: number) {
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

function getRandomNumber(gridSize: number) {
    return Math.floor(Math.random() * (Math.pow(gridSize, 2) - 1));
}

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

function matrixHasChanged(matrix1: number[][], matrix2: number[][]) {
    for (let i = 0; i<matrix1.length; i++) {
        for (let j = 0; j< matrix1.length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function isGameOver(matrix: number[][]) {
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
