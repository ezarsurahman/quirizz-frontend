import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CategoryText, DifficultyText, SettingsDropDown } from "../../components/QuizCard";
import { QuizDetailCardInteface } from "./interface";

export const QuizDetailCard = ({quiz}:QuizDetailCardInteface) => {
    return (
        <div className="flex flex-col w-[60vw] rounded-lg shadow-md border mx-16 mb-4 bg-slate-100">
            <img 
            src={`../${quiz.category}.webp`} 
            alt="" 
            className="rounded-t-lg object-cover h-80"
            />
            <div className="flex flex-col mx-6 py-2">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-semibold text-3xl mt-2">{quiz.title}</p>
                    <div className="flex flex-row gap-1 mt-2">
                        <CategoryText 
                        category={quiz.category}
                        size="lg"></CategoryText>
                        <DifficultyText 
                        difficulty={quiz.difficulty}
                        size="lg"></DifficultyText>
                    </div>
                </div>
                <div className="flex flex-row gap-2 mt-1">
                    <svg className="w-6 h-6 text-gray-800 opacity-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <p className="mr-5">John Doe</p>

                    <svg className="w-6 h-6 text-gray-800 opacity-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                    </svg>
                    <p className="mr-5">{new Date(quiz.created_at).toDateString()}</p>

                    <svg className="w-6 h-6 text-gray-800 opacity-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
                    </svg>
                    <p>10 Questions</p>
                </div>
                <p className="text-lg">{quiz.description}</p>
                <button className="bg-mainpink rounded-lg w-min text-white font-bold text-4xl px-7 py-4">Start</button>
            </div>
        </div>
    );
}

