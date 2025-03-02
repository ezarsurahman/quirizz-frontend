"use client"
import { useEffect, useState } from "react"
import { QuizTile } from "./components/QuizTile"


export const Quiz = () => {
    const [quizzes, setQuizzes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    async function fetchQuiz() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/quiz/", {
            method: "GET",
            headers: {
                'Content-Type' : "application/json"
            }
            })
            const data = await response.json()
            return data
        } catch(err) {
            console.log(err)
        }
    }

    useEffect( () => {
        async function getQuizzes() {
            const dataQuiz = await fetchQuiz()
            if(dataQuiz && dataQuiz.data) {
                setQuizzes(dataQuiz.data.quizzes)
            }
        }

        getQuizzes()
        setIsLoading(false)
    },[])
    return (
        <div className="mt-20 relative bg-slate-50">
            <div className="h-screen flex items-center justify-center z-10 relative">
                {isLoading ? (
                    <p>Loading...</p>
                ): (
                    <QuizTile quizzes={quizzes}></QuizTile>
                )}
            </div>
        </div>
    );
}