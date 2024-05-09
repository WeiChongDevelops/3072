import GameOverCell from "./GameOverCell.tsx";
import NewGameButton from "./NewGameButton.tsx";

interface GameOverProps {
    gameMatrix: number[][];
    setGameMatrix: Function;
    setCurrentScore: Function;
    isGameOver: boolean;
    setIsGameOver: Function;
}

export default function GameOver({gameMatrix, setGameMatrix, setCurrentScore, isGameOver, setIsGameOver}:GameOverProps) {


    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${gameMatrix.length}, 1fr)`,
        gridTemplateRows: `repeat(${gameMatrix.length}, 1fr)`,
        maxHeight: `${112*gameMatrix.length + 15}px`,
        boxShadow: "0 0 45px 2px rgba(153, 192, 161, 0.7)",
        zIndex: 2,
        backgroundColor: "rgba(145,19,19,0.7)",
        opacity: isGameOver? 1 : 0,
        transition: "opacity 1150ms ease-in-out"
    }

    return (
        <div className="border-customGrey border-8 rounded-2xl relative z-4" style={gridContainerStyle}>
            <div className="z-9">
            {gameMatrix[0].map((_, columnIndex) => (
                <div key={columnIndex}>
                    {gameMatrix.map((__, rowIndex) => (
                        <GameOverCell key={`${rowIndex},${columnIndex}`}/>
                    ))}
                </div>
            ))}
            </div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-screen">
                <h2 className="font-extrabold text-6xl">Game Over!</h2>
                <NewGameButton setGameMatrix={setGameMatrix} size={gameMatrix.length} setCurrentScore={setCurrentScore} buttonMessage={"Try Again"} setIsGameOver={setIsGameOver}/>
            </div>
        </div>
    );
}
