interface DisplayProps {
    displayText: string;
    displayType: string;
}

export default function Display({displayText, displayType}:DisplayProps) {
    return (
        <div className="bg-customGreen border-transparent rounded-lg p-3 w-28 text-white font-semibold">
            <h2 className="text-xl">{displayType}</h2>
            <p className="font-black text-black text-xl">{displayText}</p>
        </div>
    );
}