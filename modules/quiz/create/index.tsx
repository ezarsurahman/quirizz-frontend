import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateQuizForm } from "./components/CreateQuizForm";

export const CreateQuiz = () => {
    return (
        <div className="pt-24 h-screen flex items-center justify-center bg-slate-50">
            <div 
            className="w-[60vw] px-4 py-4 flex flex-col gap-1 bg-white rounded shadow-md">
                <p className="font-semibold text-2xl text-mainpink">Create New Quiz</p>
                <CreateQuizForm />
            </div>  
        </div>
    );
}
