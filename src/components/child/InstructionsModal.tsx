import Button from "./Button.tsx";
import {MouseEventHandler} from "react";

interface InstructionsModalProps {
    onClose: MouseEventHandler<HTMLSpanElement>
    closing: boolean
}

export default function InstructionsModal({ onClose, closing }: InstructionsModalProps) {
    return (
        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal outline outline-white">
                <div className="modal-content px-8 py-8 md:max-w-lg mx-4">
                    <span className="close-button" onClick={onClose}>&times;</span>
                    <h1 className="mt-4 mb-6 text-3xl">Welcome to 3072!</h1>
                    <ul className="list-disc mb-7 font-medium text-left">
                        <li>Please use a laptop or desktop, as you'll need arrow keys!</li>
                        <li>Use your arrow keys to move the blocks.</li>
                        <li>When two blocks with the same number touch, they merge into one with their sum!</li>
                        <li>The goal is to combine blocks to create a block with the number '3072'.</li>
                        <li>The game is over when the grid is filled and you cannot make a valid move.</li>
                    </ul>
                    <Button clickFunction={onClose} buttonMessage={"Let's Go!"}/>
                </div>
            </div>
        </div>
    );
}
