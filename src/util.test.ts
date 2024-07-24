import { describe, it, expect, vi } from 'vitest';
import { handleArrowKey, getFreshMatrix, generateNewTile, matrixHasChanged, isGameOver, validMoveIsPossible } from './util.ts';

describe('handleArrowKey', () => {
    it('should correctly handle an "up" key press', () => {
        // Init game matrix
        const initialMatrix = [
            [0, 2, 0, 2],
            [0, 0, 2, 4],
            [2, 2, 4, 8],
            [2, 4, 8, 16]
        ];

        // Mock functions
        const setGameMatrix = vi.fn();
        const setJustGenerated = vi.fn();
        const setJustMergedMatrix = vi.fn();
        const setCurrentScore = vi.fn();
        const setHighScore = vi.fn();

        const currentScore = 0;

        // Run with arrow key
        const gameOver = handleArrowKey(
          initialMatrix,
          'up',
          setGameMatrix,
          setJustGenerated,
          setJustMergedMatrix,
          setCurrentScore,
          setHighScore,
          currentScore
        );

        expect(setCurrentScore).toHaveBeenCalled(); // Check if score update was called
        expect(setHighScore).toHaveBeenCalled(); // Check if high score update was called
        expect(gameOver).toBeTypeOf('boolean'); // Function should return a boolean indicating game over status
    });
});

describe('getFreshMatrix', () => {
    it('should create a grid of the correct size', () => {
        const size = 4;
        const matrix = getFreshMatrix(size);
        expect(matrix.length).toBe(size);
        expect(matrix.every(row => row.length === size)).toBe(true);
    });

    it('should initialize with exactly two non-zero tiles', () => {
        const size = 4;
        const matrix = getFreshMatrix(size);
        const nonZeroCount = matrix.flat().filter(tile => tile !== 0).length;
        expect(nonZeroCount).toBe(2);
    });
});

describe('generateNewTile', () => {
    it('should add a new tile if the matrices have changed', () => {
        const previous = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        const current = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 3, 0, 0]
        ];
        const newMatrix = generateNewTile(previous, current, () => {});
        const addedTiles = newMatrix.flat().filter(value => value === 3).length;
        expect(addedTiles).toBeGreaterThan(1); // Assuming the original had one new tile already
    });

    it('should not add a new tile if the matrices have not changed', () => {
        const matrix = [
            [0, 0, 0, 0],
            [0, 3, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        const newMatrix = generateNewTile(matrix, matrix, () => {});
        expect(newMatrix).toEqual(matrix);
    });
});

describe('matrixHasChanged', () => {
    it('should return true if matrices are different', () => {
        const matrix1 = [
            [2, 0],
            [0, 2]
        ];
        const matrix2 = [
            [2, 2],
            [0, 2]
        ];
        expect(matrixHasChanged(matrix1, matrix2)).toBe(true);
    });

    it('should return false if matrices are identical', () => {
        const matrix = [
            [2, 2],
            [0, 2]
        ];
        expect(matrixHasChanged(matrix, matrix)).toBe(false);
    });
});

describe('isGameOver', () => {
    it('should return false if there are empty cells in the matrix', () => {
        const matrix = [
            [0, 2, 4, 8],
            [16, 32, 64, 128],
            [256, 512, 1024, 2048],
            [4096, 8192, 16384, 32768]
        ];
        expect(isGameOver(matrix)).toBe(false);
    });

    it('should return true if no moves are left and no empty cells', () => {
        const matrix = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        // Assuming validMoveIsPossible is correctly implemented to detect no possible moves
        expect(isGameOver(matrix)).toBe(true);
    });
});

describe('validMoveIsPossible', () => {
    it('should return true if at least one valid move exists', () => {
        const matrix = [
            [2, 2, 4, 8],
            [16, 32, 64, 128],
            [256, 512, 1024, 2048],
            [4096, 8192, 16384, 32768]
        ];
        expect(validMoveIsPossible(matrix)).toBe(true);
    });

    it('should return false if no valid moves are possible', () => {
        const matrix = [
            [2, 4, 2, 8],
            [8, 2, 16, 4],
            [4, 16, 8, 2],
            [2, 8, 4, 16]
        ];
        expect(validMoveIsPossible(matrix)).toBe(false);
    });
});