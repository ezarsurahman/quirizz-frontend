import { Input } from "@/components/ui/input";
import { RadioGroups } from "./RadioButton";
import { Pencil } from "lucide-react";

export const QuestionCard = ({num,question, editToggle, submitted}:QuestionCardInterface) => {
    return (
        <div className="w-full rounded bg-white shadow-sm py-3 px-3">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <p className="font-bold text-mainpink text-xl">#{num}</p>
                    <QuestionCategoryChip type={question.type}/>
                </div>
                <button onClick={() => editToggle(question.id)}>
                    {!submitted ? (
                        <Pencil className="opacity-60 hover:opacity-90 text-mainpink"/>
                    ):(
                        ""
                    )}
                </button>
            </div>
            <p className="font-semibold my-2">{question.problem}</p>
            <ChoicesBasedOnType type={question.type} choices={question.choices}/>
            <p className="font-semibold mt-3">
                Answer:
            </p>
            <p className="mb-3">{question.answer}</p>
        </div>
    );
}

const QuestionCategoryChip = ({type}:QuestionCategoryChipInterface) => {
    const TYPE_STYLE :{[key:string]:string} = {
        "Multiple Choices" : "bg-[#dbe9fe] text-[#1d40b0]",
        "True / False" : "bg-[#d1fae5] text-[#066046]",
        "Short Essay" : "bg-[#ede9fe] text-[#5b21b6]",
    }

    return (
        <p className={`${TYPE_STYLE[type]} text-xs py-1 px-2 rounded-md border font-semibold text-center`}>
            {type}
        </p>
    )
}

const ChoicesBasedOnType = ({type,choices}:ChoicesBasedOnTypeInterface) => {
    let choices_text:string[] = [];
    if (choices && Array.isArray(choices)) {
        choices_text = choices.map((choice) => {
            return choice.choice_text
        })
    }

    if(type === "Short Essay") {
        return (
            <Input 
            disabled 
            value={"Student will provide a return response..."}
            className="italic mt-5 bg-slate-100 font-semibold"
            />
        )
    } else if (type === "True / False") {
        return (
            <RadioGroups
            choices={[
                "True",
                "False"
            ]}
            disabled
            />
        )
    } else if(type === "Multiple Choices") {
        return (
            <RadioGroups
            choices={choices_text}
            disabled
            />
        )
    }
}
