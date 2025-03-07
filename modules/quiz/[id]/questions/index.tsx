"use client"

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Quiz } from "../../components/interface";
import { useParams } from "next/dist/client/components/navigation";
import QuestionList from "./components/QuestionList";
import { toast } from "sonner";
import { json } from "stream/consumers";

async function fetchQuiz(id:(string | string[] | undefined)) {
    const response = await fetch(`http://127.0.0.1:8000/api/quiz/${id}/`,{
        method:"GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    const result = await response.json()
    return result.data
}

async function fetchQuestion(id:(string | string[] | undefined)) {
    const response = await fetch(`http://127.0.0.1:8000/api/quiz/${id}/questions`,{
        method:"GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    const result = await response.json()
    return result.data
}





export const QuestionsPage = () => {
    const params = useParams()
    const {id} = params
    const [quiz,setQuiz] = useState<Quiz>()
    const [questions,setQuestions] = useState<Question[]>([])
    const [isLoading,setIsLoading] = useState(true)


    useEffect(() => {
        const getData = async () => {
            const quizData = await fetchQuiz(id)
            const questionData = await fetchQuestion(id)
            setQuiz(quizData)
            setQuestions(questionData)
            setIsLoading(false)
        }
        getData()
    }, [id])

    const deleteQuestion = (id:string) => {
        async function fetchDeleteQuestion(id:string) {
            if (quiz) {
                const response = await fetch(`http://127.0.0.1:8000/api/quiz/${quiz.id}/questions/${id}/`, {
                    method:"DELETE"
                })
                const data = await response.json()
                let temp = [...questions]
                temp = temp.filter((question) => question.id !== id)
                if(data.status === "success") {
                    setQuestions(temp)
                    toast.success("Question updated")
                } else {
                    toast.error("An error occurred, Please try again")
                }
            }
        }
        fetchDeleteQuestion(id)
        
    }

    const updateQuestion = (id:string, question:any) => {
        async function fetchUpdateQuestion(id:string, question:any) {
            if (quiz) {
                if (question.type == "Multiple Choices" && JSON.parse(question.choices).length === 0) {
                    toast.error("At least 2 choices is required for a multiple choices question")
                    return false
                }
                const response = await fetch(`http://127.0.0.1:8000/api/quiz/${quiz.id}/questions/${id}/`, {
                    method:"PUT",
                    body: JSON.stringify(question),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })
                const data = await response.json()
                if(data.status === "success") {
                    const temp = questions.map((currQuestion) =>
                        currQuestion.id === id ? {...question, choices: JSON.parse(question.choices)} : currQuestion
                    );
                    setQuestions(temp)
                    toast.success("Question updated")
                    return false
                    
                } else {
                    toast.error("An error occurred, Please try again")
                    return true
                }
            }
        }
        fetchUpdateQuestion(id,question)
    }

    const createQuestion = (question: any) => {
        async function fetchCreateQuestion(question:any) {
            if(quiz) {

                if (question.type == "Multiple Choices" && JSON.parse(question.choices).length === 0) {
                    toast.error("At least 2 choices is required for a multiple choices question")
                    return false
                }
                const response = await fetch(`http://127.0.0.1:8000/api/quiz/${quiz.id}/questions/`, {
                    method:"POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(question),
                })
                const data = await response.json()
                if(data.status === "success") {
                    const temp = [...questions, {...question, choices: JSON.parse(question.choices)}]
                    setQuestions(temp)
                    toast.success("Question created successfully")
                    return true
                    
                } else {
                    toast.error("An error occurred, Please try again")
                    return true
                }
            }
        }
        fetchCreateQuestion(question)
    }

    return (  
        <div className={`pt-24 py-5 bg-[#f9fafb] min-h-screen ${isLoading ? "flex justify-center items-center" : ""}`}>
            {isLoading ? (
                <p className="text-black font-semibold text-4xl">Loading...</p>
            ) : (
                <div className="mx-36 flex flex-col">
                    <div className="flex flex-row mb-3 justify-between items-center w-full">
                        <p className="font-semibold text-4xl truncate">Edit "{quiz?.title}"</p>
                        <Link href={"quiz/create"}>
                            <Button className="flex gap-1 bg-mainpink text-white font-semibold text-lg rounded-lg hover:bg-hoverpink" >
                                    <CirclePlus /> Create Question 
                            </Button>
                        </Link>
                    </div>
                    <p className="opacity-75">{questions?.length} Questions • {quiz?.difficulty} • {quiz?.category} </p>
                    <QuestionList 
                    questions={questions}
                    deleteQuestion={deleteQuestion}
                    updateQuestion={updateQuestion}
                    createQuestion={createQuestion}
                    />
                </div>  
            )}
        </div>
    );
}

