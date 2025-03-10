"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QuestionNav } from "./components/QuestionNav";
import { AnswerCard } from "./components/AnswerCard";
import { toast } from "sonner";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { axiosInstance } from "@/lib/utils";

const fetchQuiz = async (id:any) => {
    try {
        const response = await axiosInstance.get(`/api/quiz/${id}/`)
        const result = response.data
        return result.data
    } catch (error) {
        throw error
    }
}

const fetchQuestions = async (id:any) => {
    try {
        const response = await axiosInstance.get(`/api/questions/${id}/`)
        const result = response.data
        return result.data
    } catch (error) {
        throw error
    }
}
const fetchPrevAnswer = async (id:any) => {
    try {
        const response = await axiosInstance.get(`/api/quiz/${id}/submit/`)
        const result = response.data
        return result
    } catch(error) {
        throw error
    }
}

export const TryOutPage = () => {
    const params = useParams()
    const {id} = params
    const [isLoading, setIsLoading] = useState(true)
    const [quiz,setQuiz] = useState<any>()
    const [questions,setQuestions] = useState([])
    const [userAnswer,setUserAnswer] = useState<any[]>([])
    const [currNumber,setCurrNumber] = useState(1)
    const router = useRouter()


    useEffect(() => {
        async function getDatas() {
            const fetchedQuestions = await fetchQuestions(id)
            if(fetchQuestions.length === 0) {
                toast.error("Quiz doesn't have any questions")
                router.back()
            }
            setQuestions(fetchedQuestions)
            setUserAnswer(fetchedQuestions.map((question:any) => (
                {
                    question: question.id,
                    answer: "",
                }
            )))
            const fetchedQuiz = await fetchQuiz(id)
            setQuiz(fetchedQuiz)
            try {
                const fetchedUserAnswer = await fetchPrevAnswer(id)
                setUserAnswer(fetchedUserAnswer.data.answers)
                if(fetchedUserAnswer.data.submitted === true) {
                    toast.error("You have already done this quiz.")
                    router.back()
                }
            } catch(error) {

            }
            setIsLoading(false)
        }
        getDatas()
        
    },[])

    const onSave = async (submitted:boolean) => {
        if(userAnswer.length === 0) {
            return
        }
        setIsLoading(true)
        try {
            const data = {
                quiz : id,
                answers : userAnswer,
                submitted : submitted
            }
            const response = await axiosInstance.post(`/api/quiz/${id}/submit/`, data)
            const result = response.data
            setIsLoading(false) 
            return result
        } catch {
            setIsLoading(false)
            toast.error("An error occured")
            return false
        }
    }

    const onSubmit = async (submitted:boolean) => {
        await onSave(submitted)
        
        router.push(`/quiz/${id}/tryout/submit`)
    }

    useEffect(() => {
        onSave(false)
    },[currNumber])

    return (  
        <div className="pt-24 min-h-[80vh] flex flex-col px-5 md:px-20 pb-5 bg-[#f9fafb]">
            {!isLoading && quiz && questions ? (
                <>
                    <p className="text-2xl font-semibold">{quiz.title}</p>
                    <p className=" opacity-50">{quiz.question_count} Questions • {quiz.difficulty} • {quiz.category}</p>
                    <div className="flex flex-col-reverse md:flex-row gap-5 mt-3">
                        <div className="h-full">
                            <QuestionNav 
                                question_count={quiz.question_count}
                                setCurrNumber={setCurrNumber}
                                currNumber={currNumber}
                            />
                        </div>
                        <AnswerCard 
                            questions={questions}
                            currNumber={currNumber}
                            setCurrNumber={setCurrNumber}
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                            onSubmit={onSubmit}
                            onSave={onSave}
                        />
                    </div>
                    {currNumber == questions.length ? (
                        <ConfirmDialog 
                            className="bg-mainpink hover:bg-mainpink text-white font-semibold mt-3 self-end md:hidden w-full" 
                            onClick={() => {
                                onSubmit(true)
                            }}
                        />
                    ):(
                        ""
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
