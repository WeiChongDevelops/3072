import Display from "./Display.tsx";

interface ScoreDisplaysProps {
    currentScore: number;
    highScore: number;
    setHighScore: Function;
}

export default function ScoreDisplays({currentScore, highScore}:ScoreDisplaysProps) {
    return (
        <div className="grid grid-cols-2 sm:ml-auto gap-3">
            <Display displayText={currentScore.toString()} displayType={"SCORE"}/>
            <Display displayText={highScore.toString()} displayType={"BEST"}/>
        </div>
    );
}