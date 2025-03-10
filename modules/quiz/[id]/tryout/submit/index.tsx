"use client"
import { Progress } from "@/components/ui/progress";
import { axiosInstance } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SubmitPage = () => {
    const params = useParams()
    const {id} = params
    const [quiz,setQuiz] = useState<any>()
    const [isLoading,setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchQuiz(id:any) {
            setIsLoading(true)
            const response = await axiosInstance.get(`/api/quiz/${id}/`)
            const result = response.data
            setQuiz(result.data)
            setIsLoading(false)
            return result.data
        }
        fetchQuiz(id)
    },[])

    return ( 
        <div className="pt-24 min-h-screen bg-[#f9fafb] flex items-center justify-center">
            {!isLoading && quiz ? (
                <div className="rounded bg-white px-5 py-5 flex flex-col items-center justify-center shadow-md">
                    <Trophy 
                        className="py-2 px-2 rounded-full bg-[#fbbbe7] text-hoverpink"
                        height={70}
                        width={70}
                    />
                    <p className="mt-2 font-semibold text-3xl">Quiz Completed!</p>
                    <p className=" font-semibold opacity-50">{quiz.title}</p>
                    <div className="bg-slate-100 px-2 py-2 w-full flex flex-col items-center justify-center">
                        <p className="font-semibold text-mainpink text-xl">{quiz.grade}/{quiz.question_count}</p>
                        <p className="">Correct Answers</p>
                        <Progress value={quiz.grade/quiz.question_count *100} />
                    </div>
                    <button 
                        className="bg-mainpink px-2 py-2 rounded-md text-white font-semibold mt-2"
                        onClick={() => router.replace("/quiz")}
                    >
                        Back to Quiz
                    </button>
                </div>
            ): (
                <p className="text-semibold text-4xl">Loading...</p>
            )}
        </div>
     );
}
 
export default SubmitPage;