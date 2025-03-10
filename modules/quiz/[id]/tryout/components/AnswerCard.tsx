import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnswerRadioGroup } from "./AnswerRadioGroup";
import { useCallback, useEffect, useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

export const AnswerCard = ({questions, currNumber, setCurrNumber, userAnswer, setUserAnswer, onSubmit, onSave}:AnswerCardInterface) => {
    const currQuestion = questions[currNumber-1]


    useEffect(() => {
        
    },[currNumber])

    function updateAnswer(answer:string) {
        let updatedAnswer = [...userAnswer]
        updatedAnswer[currNumber-1].answer = answer
        
        setUserAnswer(updatedAnswer)
    }



    
    return (  
        <div className="w-full md:w-5/6 bg-white rounded shadow-md px-5 py-4 flex flex-col">
            <div className="flex flex-row justify-between">
                <p className="font-semibold text-mainpink">Question {currNumber} out of {questions.length}</p>
                <div className="flex flex-row">
                    <button 
                        disabled={currNumber === 1}>
                        <ChevronLeft
                        className={`${currNumber === 1 ? "opacity-40" : "text-mainpink"}`}
                        onClick={() => setCurrNumber(currNumber-1)}
                        />
                    </button>
                    <button
                        disabled={currNumber === questions.length}
                        onClick={() => setCurrNumber(currNumber+1)}
                    >
                        <ChevronRight 
                            className={`${currNumber === questions.length ? "opacity-40" : "text-mainpink"}`} 
                        />
                    </button>
                </div>
            </div>
            <p className="mt-5 text-lg font-semibold">{currQuestion.problem}</p>
            <div className="mt-5">
                {currQuestion.type === "Short Essay" ? (
                    <Input 
                        onChange={(e) => {
                            updateAnswer(e.target.value)
                        }}
                        value={userAnswer[currNumber-1].answer}
                        className="w-5/6"
                        placeholder="Answer"
                    />
                ) : (
                    <div>
                        <AnswerRadioGroup 
                            choices={currQuestion.choices.map((choice:any) => choice.choice_text)}
                            userAnswer={userAnswer}
                            updateAnswer={updateAnswer}
                            currNumber={currNumber}
                        />
                    </div>
                )}
            </div>
            {currNumber === questions.length ? (
                <ConfirmDialog 
                    className="bg-mainpink hover:bg-mainpink text-white font-semibold mt-3 self-end hidden md:flex" 
                    onClick={() => {
                        onSubmit(true)
                    }}
                />
            ) : (
                null
            )}
        </div>
    );
}
