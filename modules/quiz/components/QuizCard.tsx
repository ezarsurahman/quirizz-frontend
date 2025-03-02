import Link from "next/link";
import { CategoryTextInterface, DifficultyTextInterface, QuizCardInterface, SettingsDropDownInterface } from "./interface";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";

export const QuizCard = ({quiz}:QuizCardInterface) => {


    const quizDate = new Date(quiz.created_at).toDateString()
    return (  
        <Link href={`quiz/${quiz.id}`}>
            <div className="rounded-lg border  shadow-md gap-2 bg-white hover:scale-105">
                <img 
                src={`${quiz.category}.webp`} 
                alt={`${quiz.category} Category Image`} 
                className="w-full object-cover rounded-t-lg"
                />
                <div className="px-2 my-2">
                    <div className="flex flex-row items-center justify-between">
                        <p className="truncate mt-2 font-semibold">{quiz.title}</p> 
                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 10h.01M12 14h.01M12 18h.01"/>
                        </svg>
                    </div>
                    <div className="flex flex-row gap-1 mt-1 items-center">
                        <DifficultyText difficulty={quiz.difficulty}></DifficultyText>
                        <CategoryText category={quiz.category}></CategoryText>
                        <p>•</p>
                        <p className="text-xs opacity-75">10 Questions</p>
                    </div>
                    <div className="flex flex-row justify-between items-end mt-2">
                        <p className="opacity-75 text-xs">By John Doe</p>
                        <p className="opacity-50 text-xs">
                            {quizDate}
                        </p>
                    </div>
                </div>
            </div>
            <SettingsDropDown id={quiz.id}></SettingsDropDown>
        </Link>
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

export const SettingsDropDown = ({id}:SettingsDropDownInterface) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-min">
                    <svg className="w-8 h-8 text-gray-800 z-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 10h.01M12 14h.01M12 18h.01"/>
                    </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full rounded px- bg-slate-50 my-3 font-semibold" loop>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <SquarePen />
                        Edit Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                    className="text-[#e76460] hover:text-[#e76460] !important"
                    onClick={async () => {

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


