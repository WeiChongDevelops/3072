import Button from "./Button.tsx";

export default function InstructionsModal({ onClose, closing }) {
    return (
        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal">
                <div className="modal-content px-8">
                    <span className="close-button" onClick={onClose}>&times;</span>
                    <h1 className="mt-6 text-2xl">Welcome to 3072!</h1>
                    <ul className="list-disc my-6 font-medium">
                        <li>The game is played on a 4x4 grid.</li>
                        <li>Use your arrow keys to move the blocks.</li>
                        <li>When two blocks with the same number touch, they merge into one with their sum!</li>
                        <li>The goal is to combine blocks to create a block with the number '3072'.</li>
                        <li>The game is over when the grid is filled and you cannot make a move to merge blocks.</li>
                        <li>Although mobile-responsive, I haven't added swipe controls - please use a laptop or desktop :)</li>
                    </ul>
                    <Button clickFunction={onClose} buttonMessage={"Understood"}/>
                </div>
            </div>
        </div>
    );
}
