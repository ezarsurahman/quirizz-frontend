"use client"
import { useEffect, useState } from "react"
import { QuizTile } from "./components/QuizTile"
import { toast } from "sonner"
import { Quiz } from "./components/interface"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { InputDropdown } from "./create/components/InputDropdown"
import { categories, difficulties } from "./create/components/constant"
import { DatePickerWithRange } from "@/components/DateRangePicker"
import { SearchAndFilter } from "./components/SearchAndFilter"
import { DateRange } from "react-day-picker"
import { object } from "zod"
import { formatISO9075 } from "date-fns"


export const QuizHome = () => {
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

    async function getQuizzes() {
        const dataQuiz = await fetchQuiz()
        if(dataQuiz && dataQuiz.data) {
            setQuizzes(dataQuiz.data.quizzes)
        }
    }
    useEffect( () => {

        getQuizzes()
        setIsLoading(false)
    },[])

    const deleteQuiz = async (id:string) => {
        const response = await fetch(`http://127.0.0.1:8000/api/quiz/${id}/`,{
            method: "DELETE"
        })
        const data = await response.json()
        if(data.status === "success") {
            let quizCopy = quizzes.filter((quiz:Quiz) => {return quiz.id !== id})
            setQuizzes(quizCopy)
            // await getQuizzes()
            toast.success("Quiz deleted succesfully")
        } else {
            toast.error(data.message)
        }
    }

    const filter = async (
        search:string,
        category:string,
        difficulty:string,
        date: DateRange | undefined
    ) => {
        let params : {[key:string]: string} = {}
        let url = "http://127.0.0.1:8000/api/quiz/?"
        if(search !== "") {
            params.search = search;
        }
        if (category !== "") {
            params["category"] = category;
        }
        if (difficulty !== "") {
            params["difficulty"] = difficulty;
        }
        if (date?.from && date?.to) {
            const date_from = formatISO9075(date.from.toUTCString());
            const date_to = formatISO9075(date.to.toUTCString());
            params["date_from"] = date_from;
            params["date_to"] = date_to;
        }
        const response = await fetch(url + new URLSearchParams(params).toString(),{
            method:"GET",
            headers : {
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        setQuizzes(data.data.quizzes)
    }

    return (
        <div className="pt-24 py-5 relative bg-slate-50 flex items-center justify-center h-min-screen">
            <div className={`h-min-screen flex flex-col ${isLoading ? "justify-center" : "justify-start"} items-center z-10 relative w-[80vw]`}>
                <div className="flex flex-row mb-3 justify-between items-center w-full">
                    <p className="font-semibold text-4xl">All Quizzes</p>
                    <Link href={"quiz/create"}>
                        <Button className="flex gap-1 bg-mainpink text-white font-semibold text-lg rounded-lg hover:bg-hoverpink" >
                                <CirclePlus /> Create Quiz
                        </Button>
                    </Link>
                </div>
                <SearchAndFilter
                onChange={filter}
                />
                {isLoading ? (
                    <p>Loading...</p>
                ): (
                    <QuizTile 
                    quizzes={quizzes} 
                    onDelete={deleteQuiz}
                    />
                )}
            </div>
        </div>
    );
}