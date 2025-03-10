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
import { axiosInstance } from "@/lib/utils";

async function fetchQuiz(id:(string | string[] | undefined)) {
    try {
        const response = await axiosInstance.get(`/api/quiz/${id}/`)
        const result = response.data
        return result.data
    } catch(error) {
        throw error
    }
}

async function fetchQuestion(id:(string | string[] | undefined)) {
    try {
        const response = await axiosInstance.get(`/api/questions/${id}/`)
        const result = response.data
        return result.data
    } catch (error) {
        throw error
    }
}





export const QuestionsPage = () => {
    const params = useParams()
    const {id} = params
    const [quiz,setQuiz] = useState<Quiz>()
    const [questions,setQuestions] = useState<Question[]>([])
    const [isLoading,setIsLoading] = useState(true)
    const [createMode, setCreateMode] = useState<boolean>(false);

    const toggleCreateMode = () =>{
        setCreateMode(!createMode)
    }

    const scrollToCreate = () => {
        setCreateMode(true)
        const element = document.getElementById("create")
        console.log(element)
        element?.scrollIntoView({"behavior" : "smooth"})
    }

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
                const response = await axiosInstance.delete(`/api/questions/${quiz.id}/${id}/`)
                const result = response.data
                let temp = [...questions]
                temp = temp.filter((question) => question.id !== id)
                if(result.status === "success") {
                    setQuestions(temp)
                    toast.success("Question updated")
                } else {
                    toast.error("An error occurred, Please try again")
                }
            }
        }
        try {
            fetchDeleteQuestion(id)
        } catch(error) {
            toast.error("An error occurred, Please try again")
        }
        
    }

    const updateQuestion = (id:string, question:any) => {
        async function fetchUpdateQuestion(id:string, question:any) {
            if (quiz) {
                if (question.type == "Multiple Choices" && JSON.parse(question.choices).length === 0) {
                    toast.error("At least 2 choices is required for a multiple choices question")
                    return false
                }
                const response = await axiosInstance.put(`/api/questions/${quiz.id}/${id}/`, question)
                const data = response.data
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
        try {
            fetchUpdateQuestion(id,question)
        } catch (error) {
            toast.error("An error occurred, Please try again")
        }
    }

    const createQuestion = (question: any) => {
        async function fetchCreateQuestion(question:any) {
            if(quiz) {

                if (question.type == "Multiple Choices" && JSON.parse(question.choices).length === 0) {
                    toast.error("At least 2 choices is required for a multiple choices question")
                    return false
                }
                try {
                    const response = await axiosInstance.post(`/api/questions/${quiz.id}/`,question)
                    const data =  response.data
                    if(data.status === "success") {
                        const temp = [...questions, {...question, choices: JSON.parse(question.choices)}]
                        try {
                            setQuestions(await fetchQuestion(quiz.id))
                        } catch {
                            toast.error("An error occurred")
                        }
                        toast.success("Question created successfully")
                        return true
                        
                    } else {
                        toast.error("An error occurred, Please try again")
                        return true
                    }
                } catch (error) {
                    toast.error("An error occurred, Please try again")
                }
            }
        }
        try {
            fetchCreateQuestion(question)
        } catch (error) {
            toast.error("An error occurred, Please try again")
        }
    }

    return (  
        <div className={`pt-24 py-5 bg-[#f9fafb] min-h-screen ${isLoading ? "flex justify-center items-center" : ""}`}>
            {!isLoading && quiz ? (
                <div className="mx-5 md:mx-36 flex flex-col">
                    <div className="flex flex-col md:flex-row mb-3 justify-between items-center w-full gap-3">
                        <p className="font-semibold text-4xl md:truncate">Edit "{quiz?.title}"</p>
                        {!quiz.submitted ? (
                            <Button 
                            className="flex gap-1 bg-mainpink text-white font-semibold text-lg rounded-lg hover:bg-hoverpink" 
                            onClick={scrollToCreate}
                            type="button"
                            >
                                    <CirclePlus /> Create Question 
                            </Button>
                        ): (
                            ""
                        )}
                    </div>
                    <p className="opacity-75">{questions?.length} Questions • {quiz?.difficulty} • {quiz?.category} </p>
                    <QuestionList 
                    questions={questions}
                    deleteQuestion={deleteQuestion}
                    updateQuestion={updateQuestion}
                    createQuestion={createQuestion}
                    editToggle={toggleCreateMode}
                    createMode={createMode}
                    submitted={quiz.submitted}
                    />
                    <div id="create"></div>
                </div>  
            ) : (
                <p className="text-black font-semibold text-4xl">Loading...</p>
            )}
        </div>
    );
}

