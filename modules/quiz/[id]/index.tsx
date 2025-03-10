"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {Quiz} from "../components/interface"
import { QuizDetailCard } from "./components/QuizDetailCard";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/utils";

export const QuizDetails = () => {
    const params = useParams()
    const {id} = params
    const[quiz,setQuiz] = useState<Quiz | null>(null)
    const[isLoading,setIsLoading] = useState(true)

    const deleteQuiz = async (id:string) => {
        setIsLoading(true)
        const response = await axiosInstance.delete(`/api/quiz/${id}/`)
        if(response.data.status === "success") {
            toast.success("Quiz deleted succesfully")
        } else {
            toast.error(response.data.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await axiosInstance.get(`/api/quiz/${id}/`)
            const data = response.data
            setQuiz(data.data)
            setIsLoading(false)
        }
        fetchQuiz()
    },[])

    return ( 
        <div className="pt-24 min-h-[95dvh] flex justify-center items-center bg-mainpink">
            {isLoading ? (
                <p className="font-semibold text-4xl">Loading...</p>
            ) : quiz ? (
                <QuizDetailCard onDelete={deleteQuiz} quiz={quiz}/>
            ) : (
            <p></p>
            )
            }
        </div>
    );
}

