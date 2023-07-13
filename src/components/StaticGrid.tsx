import { useState, useEffect } from "react";
import Cell from "./Cell.tsx";
import * as util from "../util.ts"

interface gridProps {
    gameMatrix: number[][];
    justGenerated: boolean[][];
    justMergedMatrix: boolean[][];
}

export default function StaticGrid({gameMatrix, justGenerated, justMergedMatrix}:gridProps) {
    // const [gameMatrix, setGameMatrix] = useState(startMatrix);
    // const [justGenerated, setJustGenerated] = useState(startMatrix.map( row => row.map(cell => cell !== 0)));
    // const [justMergedMatrix, setJustMergedMatrix] = useState([
    //                                                                                             [false, false, false, false],
    //                                                                                             [false, false, false, false],
    //                                                                                             [false, false, false, false],
    //                                                                                             [false, false, false, false],
    //                                                                                         ]);



    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${gameMatrix.length}, 1fr)`,
        gridTemplateRows: `repeat(${gameMatrix.length}, 1fr)`,
        maxHeight: `${160*gameMatrix.length + 15}px`,
        boxShadow: "0 0 45px 2px rgba(153, 192, 161, 0.7)"
    };

    return (
        <div className="border-customGrey border-8 rounded-2xl bg-customGrey relative" style={gridContainerStyle}>
            {gameMatrix[0].map((_, columnIndex) => (
                <div key={columnIndex}>
                    {gameMatrix.map((matrixRow, rowIndex) => (
                        <Cell key={`${rowIndex},${columnIndex}`} cellValue={matrixRow[columnIndex]}
                              debugXCoord={rowIndex} debugYCoord={columnIndex}
                              justGenerated={justGenerated[rowIndex][columnIndex]}
                            // justMerged={justMergedMatrix[rowIndex][columnIndex]}
                              justMerged={justMergedMatrix[rowIndex][columnIndex]}/>
                    ))}
                </div>
            ))}
        </div>
    );
}
