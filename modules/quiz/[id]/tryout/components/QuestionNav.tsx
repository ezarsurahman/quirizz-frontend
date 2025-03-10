import { useEffect } from "react";

export const QuestionNav = ({question_count, currNumber,setCurrNumber}:QuestionNavInterface) => {
    return (
    <div className="bg-white rounded shadow-md py-3 px-4">
        <p className="font-semibold text-lg">Questions</p>
        <div className="grid grid-cols-5 gap-2">
            {Array.from({length: question_count},(_,i) => (
                <QuestionNavButton 
                key={i+1}
                num={i+1}
                isSelected = {currNumber == i+1}
                setCurrNumber={setCurrNumber}
                />
            ))}
        </div>
    </div>
    );
}



const QuestionNavButton = ({num, isSelected, setCurrNumber}:QuestionNavButtonInterface) => {
    return (
    <button
    className={`px-3 py-1 font-semibold rounded text-lg
        ${isSelected ? "text-white bg-mainpink hover:bg-hoverpink" : " bg-[#f3f4f6] hover:bg-[#bfc0c2] text-slate-800"}`}
    onClick={() => setCurrNumber(num)}
    >
        {num}
    </button>
    );
}
