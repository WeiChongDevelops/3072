import {MouseEventHandler} from "react";


interface ButtonProps {
    clickFunction: MouseEventHandler<HTMLSpanElement>;
    buttonMessage: string;
    children?: React.ReactNode
}

export default function Button({clickFunction, buttonMessage, children}:ButtonProps) {

    return (
        <button className="flex flex-row items-center gap-2.5 rounded-lg border border-transparent px-4 py-2 text-base
        font-semibold text-white bg-black cursor-pointer transition-all
        duration-200 ease-out hover:border-customGreen hover:scale-110" onClick={clickFunction}>
            {children}
            {buttonMessage}
        </button>
    );
}