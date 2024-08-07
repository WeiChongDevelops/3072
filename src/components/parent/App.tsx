import '../../css/App.css';
import Game3072 from "../child/Game3072.tsx";
import "../../css/Cell.css";
import InstructionsModal from "../child/InstructionsModal.tsx";
import { useState } from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

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

  const [animationParent] = useAutoAnimate()

    return (
        <div className={`${closing ? 'closing' : ''} mx-24 max-h-screen`} ref={animationParent}>
            {showModal && <InstructionsModal onClose={onClose}  closing={closing}/>}
            <div className={`game-container ${showModal ? 'filter blur-md' : ''}`}>
                <Game3072 size={SIZE} setShowModal={setShowModal}/>
            </div>
        </div>
    );
}

