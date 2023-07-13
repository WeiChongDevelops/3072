import Cell from "./Cell.tsx";
import GameOver from "./GameOver.tsx"

interface gridProps {
    gameMatrix: number[][];
    justGenerated: boolean[][];
    justMergedMatrix: boolean[][];
    setGameMatrix: Function;
    setCurrentScore: Function;
    isGameOver: boolean;
    setIsGameOver: Function;
}

export default function Grid({gameMatrix, justGenerated, justMergedMatrix, setGameMatrix, setCurrentScore, isGameOver, setIsGameOver}:gridProps) {

    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${gameMatrix.length}, 1fr)`,
        gridTemplateRows: `repeat(${gameMatrix.length}, 1fr)`,
        maxHeight: `${128*gameMatrix.length + 15}px`,
        boxShadow: `0 0 45px 2px ${isGameOver ? 'rgba(255,0,0,0.9)' : 'rgba(153, 192, 161, 0.7)' }`,
        zIndex: 1,
    };

    return (
        <div className="flex justify-center items-center relative" >
            <GameOver gameMatrix={gameMatrix}
                      setGameMatrix={setGameMatrix}
                      setCurrentScore={setCurrentScore}
                      isGameOver={isGameOver}
                      setIsGameOver={setIsGameOver}/>
            <div className="border-customGrey border-8 rounded-2xl bg-customGrey absolute" style={gridContainerStyle}>
                {gameMatrix[0].map((_, columnIndex) => (
                    <div key={columnIndex}>
                        {gameMatrix.map((matrixRow, rowIndex) => (
                            <Cell key={`${rowIndex},${columnIndex}`} cellValue={matrixRow[columnIndex]}
                                  debugXCoord={rowIndex} debugYCoord={columnIndex}
                                  justGenerated={justGenerated[rowIndex][columnIndex]}
                                  justMerged={justMergedMatrix[rowIndex][columnIndex]}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    );
}
