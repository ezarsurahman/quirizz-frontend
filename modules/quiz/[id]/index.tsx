"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {Quiz} from "../components/interface"
import { QuizDetailCard } from "./components/QuizDetailCard";
import { toast } from "sonner";

export const QuizDetails = () => {
    const params = useParams()
    const {id} = params
    const[quiz,setQuiz] = useState<Quiz | null>(null)
    const[isLoading,setIsLoading] = useState(true)

    const deleteQuiz = async (id:string) => {
        setIsLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/quiz/${id}/`,{
            method: "DELETE"
        })
        const data = await response.json()
        if(data.status === "success") {
            toast.success("Quiz deleted succesfully")
        } else {
            toast.error(data.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/quiz/${id}`)
            const data = await response.json()
            setQuiz(data.data)
            setIsLoading(false)
        }
        fetchQuiz()
    },[])

    return ( 
        <div className="pt-24 h-[95dvh] flex justify-center items-center bg-mainpink">
            {isLoading ? (
                <p>Loading...</p>
            ) : quiz ? (
                <QuizDetailCard onDelete={deleteQuiz} quiz={quiz}></QuizDetailCard>
            ) : (
            <p></p>
            )
            }
        </div>
    );
}

