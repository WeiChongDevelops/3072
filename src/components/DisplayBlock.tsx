import NewGameButton from "./NewGameButton.tsx";
import ScoreDisplays from "./ScoreDisplays.tsx";


export default function DisplayBlock({currentScore, setCurrentScore, setGameMatrix, size, highScore, setHighScore, setIsGameOver}) {
    return (
        <div className="flex flex-col">
            <ScoreDisplays currentScore={currentScore} highScore={highScore} setHighScore={setHighScore}/>
            <NewGameButton setGameMatrix={setGameMatrix} size={size} setCurrentScore={setCurrentScore} setIsGameOver={setIsGameOver}/>
        </div>
    );
}
