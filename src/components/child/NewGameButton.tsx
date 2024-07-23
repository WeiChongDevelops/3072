import {getFreshMatrix} from "../../util.ts";
import Button from "./Button.tsx";
import {ArrowCounterClockwise} from "@phosphor-icons/react";
interface NewGameButtonProps {
    setGameMatrix: Function;
    size: number;
    setCurrentScore: Function;
    buttonMessage?: string;
    setIsGameOver: Function;
}

export default function NewGameButton({setGameMatrix, size, setCurrentScore, buttonMessage="New Game", setIsGameOver}:NewGameButtonProps) {

    const handleClick = () => {
        setGameMatrix(getFreshMatrix(size));
        setCurrentScore(0);
        setIsGameOver(false);
    }

    return (
      <Button clickFunction={handleClick} buttonMessage={buttonMessage!}>
          <ArrowCounterClockwise weight={"bold"}/>
      </Button>
    );
}