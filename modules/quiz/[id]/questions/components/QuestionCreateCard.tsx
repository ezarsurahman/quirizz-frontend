import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { QUESTION_TYPE } from "./constant";
import { InputDropdown } from "@/modules/quiz/create/components/InputDropdown";
import DOMPurify from "dompurify";
import { EditChoices, EditChoicesEssay } from "./QuestionEditCard";
import { useState } from "react";


export const QuestionCreateCard = ({num ,createQuestion, editToggle}:QuestionCreateCardInterface) => {
    const schema = z.object({
            type: z.string().min(1, "Type is required"),
            problem: z.string().min(1, "Description is required"),
            choices: z.array(z.string().min(1,"Choice is required")),
            answer: z.string().min(1, "Answer is required")
        });

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
            resolver: zodResolver(schema),
            defaultValues : {
            type: "",
            problem: "",
            choices: [],
            answer:""
            }
        });
    
    const [choices,setChoices] = useState<string[]>([])
    const [answer,setAnswer] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<string>("")

    const changeAnswer = (answer:string) => {
        console.log("change answer")
        setValue("answer",answer)
        setAnswer(answer)
    } 

    const onDeleteQuestion = () => {
        setIsLoading(true)
        editToggle()
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
            choice_text : choice
        }))

        const sanitizedInput = {
            number: num,
            type: DOMPurify.sanitize(type),
            problem: DOMPurify.sanitize(problem),
            choices: DOMPurify.sanitize(JSON.stringify(choices_obj)),
            answer: DOMPurify.sanitize(answer),
        }
        console.log(sanitizedInput)
        setIsLoading(true)
        const result = createQuestion(sanitizedInput)
        setIsLoading(false)
        editToggle()

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
            {type === "" ? (
                <p>Please select a question type</p>
            ) :
                type === "Short Essay"  ? (
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
                )
            }
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
 
