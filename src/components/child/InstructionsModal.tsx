import Button from "./Button.tsx";
import {MouseEventHandler} from "react";

interface InstructionsModalProps {
    onClose: MouseEventHandler<HTMLSpanElement>
    closing: boolean
}

export default function InstructionsModal({ onClose, closing }: InstructionsModalProps) {
    return (
        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal">
                <div className="modal-content px-8 py-8 md:max-w-lg mx-4 flex flex-col items-center">
                    <span className="close-button" onClick={onClose}>&times;</span>
                    <h1 className="mt-4 text-3xl">Welcome to 3072!</h1>
                    <ol className="list-decimal flex flex-col gap-1 ml-2.5 my-6 font-normal text-left">
                        <li><b>Swipe</b> or use <b>arrow keys</b> to move the blocks.</li>
                        <li>When two blocks with the <b>same</b> number touch, they combine to form a block with their sum!</li>
                        <li>The goal is to combine blocks to create a block with the number <b>'3072'</b>.</li>
                        <li>The game is over when the grid is filled and you cannot make a valid move.</li>
                    </ol>
                    <Button clickFunction={onClose} buttonMessage={"Let's Go!"}/>
                </div>
            </div>
        </div>
    );
}
