interface DisplayProps {
    displayText: string;
    displayType: string;
}

export default function Display({displayText, displayType}:DisplayProps) {
    return (
        <div className="bg-customGreen border-transparent rounded-lg py-2.5 px-5 w-28 text-white font-semibold flex flex-col items-center">
            <h2 className="font-semibold text-black text-sm">{displayType}</h2>
            <p className="font-black text-white text-3xl extra-glowy-text">{displayText}</p>
        </div>
    );
}