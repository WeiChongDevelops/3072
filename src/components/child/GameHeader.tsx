import ScoreDisplays from "./ScoreDisplays.tsx";
import NewGameButton from "./NewGameButton.tsx";
import {cn} from "../../util.ts";

interface GameHeaderProps {
    setGameMatrix: Function;
    size: number;
    currentScore: number;
    setCurrentScore: Function;
    highScore: number;
    setHighScore: Function;
    setIsGameOver: Function;
}

export default function GameHeader({setGameMatrix, size, currentScore, setCurrentScore, highScore, setHighScore, setIsGameOver}:GameHeaderProps) {
    return <div className="flex flex-col items-center mt-6 mb-6 z-20 w-full gap-6 sm:gap-4">
        <div className={cn("flex flex-col sm:flex-row gap-8 sm:gap-0 items-center w-full")}>
            <h1 className="font-extrabold text-7xl ml-4 extra-glowy-text">3072</h1>
            <ScoreDisplays currentScore={currentScore} highScore={highScore} setHighScore={setHighScore}/>
        </div>
        <div className={"flex flex-row items-center sm:justify-end justify-center w-full"}>
            <NewGameButton setGameMatrix={setGameMatrix} size={size} setCurrentScore={setCurrentScore} setIsGameOver={setIsGameOver}/></div>
    </div>
}