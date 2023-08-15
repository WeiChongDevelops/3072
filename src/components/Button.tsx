import {MouseEventHandler} from "react";


interface ButtonProps {
    clickFunction: MouseEventHandler<HTMLSpanElement>;
    buttonMessage: string;
}

export default function Button({clickFunction, buttonMessage}:ButtonProps) {

    return (
        <button className=" mx-4 self-end text-lg rounded-lg border border-transparent px-4 py-2 text-base
        font-semibold text-white bg-black cursor-pointer transition-colors duration-200 transition-transform
        duration-200 ease-out hover:border-customGreen hover:scale-110 focus:outline-none focus:ring-2
        focus:ring-blue-600 focus:ring-opacity-50" onClick={clickFunction}>
            {buttonMessage}
        </button>
    );
}