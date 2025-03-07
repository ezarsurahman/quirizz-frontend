"use client"
import { useParams } from "next/navigation";
import { EditQuizForm } from "./EditQuizForm";
import { useEffect, useState } from "react";

export const EditQuiz = () => {
  const params = useParams()
  const {id} = params

  const [quiz,setQuiz] = useState()
  const [isLoading,setIsLoading] = useState(true)

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
      <div className="pt-24 h-screen flex items-center justify-center bg-slate-50">
          {isLoading && quiz ? (
            <p className="text-4xl">Loading...</p>
          ) : (
            <div 
            className="w-[60vw] px-4 py-4 flex flex-col gap-1 bg-white rounded shadow-md">
                <p className="font-semibold text-2xl text-mainpink">Edit Quiz</p>
                {quiz && <EditQuizForm quiz={quiz}/>}
            </div>  
          )}
      </div>
  );
}