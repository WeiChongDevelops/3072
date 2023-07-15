import { colours } from "../styleobjects.ts";

interface CellProps {
    cellValue: number;
    debugXCoord: number;
    debugYCoord: number;
    justGenerated: boolean;
    justMerged: boolean;
}

export default function Cell({cellValue, justGenerated, justMerged}:CellProps) {

    const colourObject = cellValue === 0 ? colours[0] : colours[Math.log2(cellValue/3) + 1];


    return (
        <div style={{backgroundColor: colourObject.backgroundColour}}
             className={` 
        w-28 h-28
        border-customGrey border-8 rounded-xl
        flex flex-col justify-center
        ${justGenerated && "just-generated"}
        ${justMerged && "just-merged"}`}>
            <p className="font-extrabold text-3xl"
               style={{color: colourObject.textColour,
                   fontSize: colourObject.textSize}}>
                {cellValue ? cellValue : null}
            </p>
            {/*<small className="text-black text-sm">*/}
            {/*    {`${debugXCoord},${debugYCoord}`}</small>*/}
        </div>
    );
}