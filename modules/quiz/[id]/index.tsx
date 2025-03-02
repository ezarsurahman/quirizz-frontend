"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {Quiz} from "../components/interface"
import { QuizDetailCard } from "./components/QuizDetailCard";

export const QuizDetails = () => {
    const params = useParams()
    const {id} = params

    const[quiz,setQuiz] = useState<Quiz | null>(null)
    const[isLoading,setIsLoading] = useState(true)

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
                <QuizDetailCard quiz={quiz}></QuizDetailCard>
            ) : (
            <p></p>
            )
            }
        </div>
    );
}

