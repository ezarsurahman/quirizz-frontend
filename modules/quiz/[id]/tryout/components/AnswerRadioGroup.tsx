import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect } from "react";

export const AnswerRadioGroup = ({choices, currNumber, userAnswer,updateAnswer}:AnswerRadioGroupInterface) => {


    return (  
        <RadioGroup defaultValue={userAnswer[currNumber - 1].answer} value={userAnswer[currNumber-1].answer}  className="mt-3">
        {choices.map((choice,index) => {
            return (
            <div className="flex items-center space-x-2 mb-2 border rounded py-2 px-2" key={index}>
                <RadioGroupItem 
                    value={choice} 
                    id={`r${index+1}`} 
                    onClick={(e) => updateAnswer(choice)}
                />
                <Label htmlFor={`r${index+1}`}>{choice}</Label>
            </div>
            )
        })}
        </RadioGroup>
    );
}

