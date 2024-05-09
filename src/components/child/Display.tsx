interface DisplayProps {
    displayText: string;
    displayType: string;
}

export default function Display({displayText, displayType}:DisplayProps) {
    return (
        <div style={{minWidth: "120px"}} className="bg-customGreen ml-2 mr-4 border-transparent rounded-lg p-3 text-white font-semibold">
            <h2 className="text-xl">{displayType}</h2>
            <p className="font-black text-black text-xl">{displayText}</p>
        </div>
    );
}