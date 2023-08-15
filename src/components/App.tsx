import '../css/App.css';
import Game3072 from "./Game3072.tsx";
import "../css/Cell.css";
import "../firebase.ts";
import InstructionsModal from "./InstructionsModal.tsx";
import { useState } from "react";

const SIZE = 4;
export default function App() {
    const [showModal, setShowModal] = useState(true);
    const [closing, setClosing] = useState(false);

    const onClose = () => {
        setClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setClosing(false);
        }, 1000);
    };

    return (
        <div className={`${closing ? 'closing' : ''}`}>
            {showModal && <InstructionsModal onClose={onClose} />}
            <div className={`game-container ${showModal ? 'filter blur-md' : ''}`}>
                <Game3072 size={SIZE}/>
            </div>
        </div>
    );
}

