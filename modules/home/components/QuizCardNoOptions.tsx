import Link from "next/link";
import { CategoryTextInterface, DifficultyTextInterface,QuizCardNoOptionsInterface, SettingsDropDownInterface } from "./interface";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, ListChecks, Router, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const QuizCardNoOptions = ({quiz}:QuizCardNoOptionsInterface) => {

    const router = useRouter()

    const quizDate = new Date(quiz.created_at).toDateString()
    return (  
        <button onClick={() => router.push(`quiz/${quiz.id}`)} className="">
            <div className="rounded-lg border  shadow-md gap-2 bg-white ">
                <img 
                src={`quiz-img/${quiz.category}.webp`} 
                alt={`${quiz.category} Category Image`} 
                className="w-full object-cover rounded-t-lg"
                />
                <div className="px-2 my-2">
                    <div className="flex flex-row items-center justify-between">
                        <p className="truncate mr-2 font-semibold">{quiz.title}</p> 
                    </div>
                    <div className="flex flex-row gap-1 mt-1 items-center">
                        <DifficultyText difficulty={quiz.difficulty}></DifficultyText>
                        <CategoryText category={quiz.category}></CategoryText>
                        <p>•</p>
                        <p className="text-xs opacity-75">{quiz.question_count} Questions</p>
                    </div>
                    <div className="flex flex-row justify-between items-end mt-2">
                        <p className="opacity-75 text-xs">By John Doe</p>
                        <p className="opacity-50 text-xs">
                            {quizDate}
                        </p>
                    </div>
                </div>
            </div>
        </button>
    );
}

export const DifficultyText = ({difficulty, size="xs"}:DifficultyTextInterface) => {
    const COLOR_DIF: {[key:string]:string} = {
        "Easy" : "bg-[#d1fae5] text-[#066046]",
        "Medium" : "bg-[#fef3c7] text-[#92400d]",
        "Hard" : "bg-[#fee2e1] text-[#991b1b]"
    }   
    return (
        <p className={`py-1 px-1 text-center rounded-md border font-semibold text-${size} ${COLOR_DIF[difficulty]}`}
        >{difficulty}
        </p>
    );
}

export const CategoryText = ({category, size="xs"}:CategoryTextInterface) => {
    const COLOR_CAT: { [key: string]: string } = {
        "Trivia": " bg-pink-600",
        "Science": " bg-green-600",
        "Social Studies": "bg-black",
        "English": " bg-blue-600",
        "World Languages": " bg-sky-600",
        "Art": " bg-orange-600",
        "Culture": " bg-yellow-600",
        "History": " bg-yellow-600",
    };
    
    return (
        <p className={`py-1 px-2 rounded-md border font-semibold text-${size} text-white text-center ${COLOR_CAT[category]}`}
        >{category}
        </p>
    )
}

export const SettingsDropDown = ({id, onDelete}:SettingsDropDownInterface) => {
    const router = useRouter()
    const stopPropagation = (e:React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    const onEdit = () => {
        router.push(`/quiz/${id}/edit`)
    }

    const onQuestions = () => {
        router.push(`/quiz/${id}/questions`)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild
            className="w-min"
            onClick={(e) => {
                stopPropagation(e)
            }}
            >
                <EllipsisVertical   style={{opacity:0.75}} className="px-2 py-2 !min-w-8 !min-h-8"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full rounded px- bg-slate-50 my-3 font-semibold" loop>
                <DropdownMenuGroup>
                    <DropdownMenuItem 
                    onClick={(e) => {
                        stopPropagation(e)
                        onQuestions()
                    }}>
                        <ListChecks />
                        Edit Questions
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                    onClick={(e) => {
                        stopPropagation(e)
                        onEdit()
                    }}>
                        <SquarePen />
                        Edit Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                    className="text-[#e76460] hover:text-[#e76460] !important"
                    onClick={async (e) => {
                        console.log("delete")
                        stopPropagation(e)
                        await onDelete(id)
                    }}
                    >
                        <Trash2 color="#e76460" />
                        Delete Quiz
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


