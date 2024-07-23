import Grid from "./Grid.tsx";
import {getFreshMatrix} from "../../util.ts";
import GameHeader from "./GameHeader.tsx";
import {useEffect, useState} from "react";
import {handleArrowKey} from "../../util.ts";

interface Game3072Props {
    size: number;
}

export default function Game3072({size}: Game3072Props) {

    const startMatrix = getFreshMatrix(size);

    const [gameMatrix, setGameMatrix] = useState(startMatrix);
    const [justGenerated, setJustGenerated] = useState(startMatrix.map( row => row.map(cell => cell !== 0)));
    const [justMergedMatrix, setJustMergedMatrix] = useState([
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ]);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(loadFromLocalStorage);
    const [isGameOver, setIsGameOver] = useState(false);

    function saveToLocalStorage(value: number) {
        localStorage.setItem('storedHighScore', value.toString());
    }

    function loadFromLocalStorage() {
        const retrievedHighScore = localStorage.getItem('storedHighScore');
        return retrievedHighScore ? parseInt(retrievedHighScore): 0;
    }

    useEffect( () => saveToLocalStorage(highScore), [highScore]);


    useEffect(() => {
        const handleKeyDown = (evt: KeyboardEvent) => {
            let key = "";
            switch (evt.code) {
                case "ArrowLeft":
                    key = "left";
                    break;
                case "ArrowRight":
                    key = "right";
                    break;
                case "ArrowUp":
                    key = "up";
                    break;
                case "ArrowDown":
                    key = "down";
                    break;
            }
            console.log({ currentScore, highScore });
            key && (setIsGameOver(handleArrowKey(gameMatrix, key, setGameMatrix, setJustGenerated, setJustMergedMatrix, setCurrentScore, setHighScore, currentScore)));
        };

        const handleSwipe = (direction: string) => {
            console.log({ currentScore, highScore });
            direction && (setIsGameOver(handleArrowKey(gameMatrix, direction, setGameMatrix, setJustGenerated, setJustMergedMatrix, setCurrentScore, setHighScore, currentScore)));
        };

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const handleTouchStart = (evt: TouchEvent) => {
            touchStartX = evt.touches[0].clientX;
            touchStartY = evt.touches[0].clientY;
        };

        const handleTouchMove = (evt: TouchEvent) => {
            touchEndX = evt.touches[0].clientX;
            touchEndY = evt.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            if (absDeltaX > absDeltaY) {
                if (deltaX > 0) {
                    handleSwipe("right");
                } else {
                    handleSwipe("left");
                }
            } else {
                if (deltaY > 0) {
                    handleSwipe("down");
                } else {
                    handleSwipe("up");
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentScore, highScore]);

    return (
        <div className={"flex flex-col justify-center items-center h-screen"}>
            <GameHeader
                setGameMatrix={setGameMatrix}
                size={size}
                currentScore={currentScore}
                setCurrentScore={setCurrentScore}
                highScore={highScore}
                setHighScore={setHighScore}
                setIsGameOver={setIsGameOver}/>
            <Grid
                gameMatrix={gameMatrix}
                justGenerated={justGenerated}
                justMergedMatrix={justMergedMatrix}
                setGameMatrix={setGameMatrix}
                setCurrentScore={setCurrentScore}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}/>
        </div>
    )
}
