import Display from "./Display.tsx";

interface ScoreDisplaysProps {
    currentScore: number;
    highScore: number;
    setHighScore: Function;
}

export default function ScoreDisplays({currentScore, highScore}:ScoreDisplaysProps) {
    return (
        <div className="flex flex-row mt-3 mb-6 ml-10">
            <Display displayText={currentScore.toString()} displayType={"SCORE"}/>
            <Display displayText={highScore.toString()} displayType={"BEST"}/>
        </div>
    );
}