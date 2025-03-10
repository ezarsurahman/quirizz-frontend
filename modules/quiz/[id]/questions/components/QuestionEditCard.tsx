import { InputDropdown } from "@/modules/quiz/create/components/InputDropdown";
import { QUESTION_TYPE } from "./constant";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Control, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroups } from "./RadioButton";
import { CirclePlus, TrashIcon } from "lucide-react";
import DOMPurify from "dompurify";


export const QuestionEditCard = ({num, question, deleteQuestion ,updateQuestion, editToggle, submitted}:QuestionEditCardInterface) => {
    const schema = z.object({
        type: z.string().min(1, "Type is required"),
        problem: z.string().min(1, "Description is required"),
        choices: z.array(z.string().min(1,"Choice is required")),
        answer: z.string().min(1, "Answer is required")
    });

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: zodResolver(schema),
        defaultValues : {
            type:question.type,
            problem:question.problem,
            choices:Array.isArray(question.choices) ? question.choices?.map((choice) => choice.choice_text) : [], 
            answer:question.answer
        }
      });
    
    const [choices,setChoices] = useState<string[]>(Array.isArray(question.choices) ? question.choices?.map((choice) => choice.choice_text) : [])
    const [answer,setAnswer] = useState(question.answer)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<string>(question.type)

    const changeAnswer = (answer:string) => {
        console.log("change answer")
        setValue("answer",answer)
        setAnswer(answer)
    } 

    const onDeleteQuestion = () => {
        setIsLoading(true)
        console.log(question.id)
        deleteQuestion(question.id)
        setIsLoading(false)
    }

    const onChangeChoice = (choices:string[]) => {
        console.log("form choice change")
        console.log(choices)
        setChoices(choices)
        setValue("choices",choices)
    }

    const onSubmit = (data: any) => {
        let {type, problem, choices, answer} = data

        let choices_obj = choices.map((choice:string) => ({
            question : question.id,
            choice_text : choice
        }))

        const sanitizedInput = {
            quiz: question.quiz,
            id: question.id,
            number: question.number,
            type: DOMPurify.sanitize(type),
            problem: DOMPurify.sanitize(problem),
            choices: DOMPurify.sanitize(JSON.stringify(choices_obj)),
            answer: DOMPurify.sanitize(answer),
        }
        console.log(sanitizedInput)
        setIsLoading(true)
        const result = updateQuestion(question.id, sanitizedInput)
        setIsLoading(false)
        editToggle(question.id)
        
    };

    return (  
        <form 
        className={`w-full rounded bg-white shadow-sm py-3 px-3 ${isLoading? "opacity-50" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <p className="font-bold text-mainpink text-xl">#{num}</p>
                    <p>Type:</p>
                    <Controller
                    name="type"
                    control={control}
                    render={(({field}) => (
                        <InputDropdown 
                        options={QUESTION_TYPE} 
                        title="Type"
                        val={type}
                        onChange={ (type:string) => {
                            setValue("type",type)
                            setType(type)
                            if (type === "True / False") {
                                onChangeChoice(["True", "False"])
                            }
                        }}
                        />
                    ))}
                    />
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                </div>
            </div>
            
            <p className="font-semibold my-2">Problem</p>
            <Controller
            name="problem"
            control={control}
            render={(({field}) => (
                <Input {...field}/>
            ))}
            />
            {errors.problem && <p className="text-red-500">{errors.problem.message}</p>}
            
            {type === "Short Essay"  ? (
                <>
                    <EditChoicesEssay
                    type={type}
                    answer={getValues("answer")}
                    onAnswerChange={changeAnswer}
                    control={control}
                    />
                    {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
                </>
            ) : (
                <>
                    
                    <p className="font-semibold mt-2">Choices</p>
                    <EditChoices 
                    type={type}
                    choices={choices}
                    answer={getValues("answer")}
                    control={control}
                    onAnswerChange={changeAnswer}
                    onChoiceChange={onChangeChoice}
                    />
                    {errors.choices && <p className="text-red-500">{errors.choices.message}</p>}
                </>
            )}
            <div className="flex w-full justify-between my-3">
                <button
                className="bg-mainpink hover:bg-hoverpink font-semibold text-white px-2 py-1 rounded-md" 
                >
                    Save
                </button>
                <button
                onClick={(e) => onDeleteQuestion()}
                type="button"
                >
                    <TrashIcon
                    className="text-red-500 hover:text-red-700"
                    />
                </button>
            </div>
        </form>
    );
}



interface EditChoicesInterface {
    type: string
    choices:  string[]
    answer: string
    control: Control<{ type: string; problem: string; choices: string[]; answer: string; }, any>
    onAnswerChange: (newAnswer: string) => void;
    onChoiceChange: (choices:string[]) => void
}
export const   EditChoices = ({type,choices,answer ,control ,onAnswerChange, onChoiceChange}:EditChoicesInterface) => {
    const [newChoice, setNewChoice] = useState<string>("")

    const addChoice = () => {
        const temp = [...choices,newChoice]
        console.log(temp)
        onChoiceChange(temp)
        setNewChoice("")
    }


    return (
        <>
        <Controller 
        name="choices"
        control={control}
        render={((field) => (
            <RadioGroups
            onValueChange={onAnswerChange}
            choices={choices}
            editable={type==="Multiple Choices"}
            setChoices={onChoiceChange}
            />
        ))}
        />
        {type === "Multiple Choices" ? (
            <div className="flex flex-row mt-2 gap-2 items-center">
                <Input 
                placeholder="Add Choice" 
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
                className="w-1/3" 
                />
                <button type="button" onClick={addChoice}>
                    <CirclePlus />
                </button>
            </div>
        ) : ("")}

        <p className="font-semibold mt-2">Answer:</p>
        <p className="mb-3">{answer}</p>
        </>
    )
}

interface EditChoiceEssayInterface {
    type: string
    answer: string
    control: Control<{ type: string; problem: string; choices: string[]; answer: string; }, any>
    onAnswerChange: (newAnswer: string) => void;
}
export const EditChoicesEssay = ({type, answer, control, onAnswerChange}:EditChoiceEssayInterface) => {
    const[currAnswer,setAnswer] = useState<string>(answer)
    return (
        <>  
            <p className="font-semibold mt-3">Answer:</p>
            <Controller 
            name="answer"
            control={control}
            render={((field) => 
                <Input 
                onChange={(e) => {
                    onAnswerChange(e.target.value)
                    setAnswer(e.target.value)
                }}
                value={currAnswer}
                />
            )}
            />
        </>
    )
}

