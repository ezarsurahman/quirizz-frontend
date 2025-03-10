import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CategoryText, DifficultyText, SettingsDropDown } from "../../components/QuizCard";
import { QuizDetailCardInteface } from "./interface";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuestionCard } from "../questions/components/QuestionCard";

export const QuizDetailCard = ({quiz, onDelete}:QuizDetailCardInteface) => {
    const router = useRouter()

    const routeToQuiz= () => {
        router.push(`/quiz/${quiz.id}/tryout`)
    }

    return (
        <div className="flex flex-col w-[90vw] md:w-[60vw] rounded-lg shadow-md border mx-3 md:mx-16 mb-4 bg-slate-100 relative">
            <div className="bg-white absolute rounded-lg top-3 right-3 z-20 cursor-pointer">
                <SettingsDropDown id={quiz.id} onDelete={(id:string) =>{
                    onDelete(id)
                    router.push("/quiz")
                }}/>
            </div>
            <img 
            src={`../quiz-img/${quiz.category}.webp`} 
            alt="" 
            className="rounded-t-lg object-cover h-80"
            />
            <div className="flex flex-col mx-6 py-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <p className="font-semibold text-3xl mt-2">{quiz.title}</p>
                    <div className="flex flex-col md:flex-row gap-1 mt-2 w-min md:w-full">
                        <CategoryText 
                        category={quiz.category}
                        size="lg"></CategoryText>
                        <DifficultyText 
                        difficulty={quiz.difficulty}
                        size="lg"></DifficultyText>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-1">
                    <div className="flex flex-row gap-2">
                        <svg className="w-6 h-6 text-gray-800 opacity-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>
                        <p className="mr-5">{new Date(quiz.created_at).toDateString()}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <svg className="w-6 h-6 text-gray-800 opacity-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
                        </svg>
                        <p>{quiz.question_count} Questions</p>
                    </div>
                </div>
                <p className="text-lg my-5">{quiz.description}</p>
                <div className="flex flex-row gap-2 items-center">
                    <button 
                        disabled={quiz.question_count === 0 || quiz.submitted}
                        className={`self-start ${quiz.question_count===0 || quiz.submitted ? "bg-slate-200 border text-bg-slate-50" : "bg-mainpink hover:bg-hoverpink"} rounded-lg w-min text-white font-bold text-4xl px-7 py-4`}
                        onClick={routeToQuiz}
                    >
                        Start
                    </button>
                    {quiz.submitted ? (
                        <p>Grade: {quiz.grade}/{quiz.question_count}</p> 
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

