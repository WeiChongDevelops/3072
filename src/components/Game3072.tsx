import Grid from "./Grid.tsx";
import {getFreshMatrix} from "../util.ts";
import GameHeader from "./GameHeader.tsx";
import {useEffect, useState} from "react";
import {handleArrowKey} from "../util.ts";

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
                case("ArrowLeft"):
                    key = "left";
                    break;
                case("ArrowRight"):
                    key = "right";
                    break;
                case("ArrowUp"):
                    key = "up";
                    break;
                case("ArrowDown"):
                    key = "down";
                    break;
            }
            console.log({currentScore, highScore})
            key && (setIsGameOver(handleArrowKey(gameMatrix, key, setGameMatrix, setJustGenerated, setJustMergedMatrix, setCurrentScore, setHighScore, currentScore)));
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [currentScore, highScore]); // depend on currentScore, highScore

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            marginTop: "4000px;"
        }}>
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
