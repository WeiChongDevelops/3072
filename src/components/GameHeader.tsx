import DisplayBlock from "./DisplayBlock.tsx"

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
    // return <div className="flex flex-row justify-between items-end mb-20 relative top-96 z-20">
    //     <h1 className="font-extrabold justify-self-start self-start text-4xl">3072</h1>
    //     <DisplayBlock currentScore={currentScore} setCurrentScore={setCurrentScore} setGameMatrix={setGameMatrix} size={size} highScore={highScore} setHighScore={setHighScore} setIsGameOver={setIsGameOver}/>
    // </div>
    return <div className="flex flex-row justify-between mt-6 items-end z-20 justify-self-end">
        <h1 className="font-extrabold justify-self-start self-start text-8xl ml-4">3072</h1>
        <DisplayBlock currentScore={currentScore} setCurrentScore={setCurrentScore} setGameMatrix={setGameMatrix} size={size} highScore={highScore} setHighScore={setHighScore} setIsGameOver={setIsGameOver}/>
    </div>
}