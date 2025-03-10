"use client"
import { CheckCheck, LibraryBig, NotebookPen, Palette } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import dynamic from "next/dynamic";

const QuizCardNoOptions = dynamic(() => import("./components/QuizCardNoOptions").then(mod => mod.QuizCardNoOptions));


export function Home() {
    const [quizzes,setQuizzes] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    async function fetchQuiz() {
        try {
            const data = await axiosInstance.get("/api/quiz/")
            return data.data
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

    return(
        <div 
            className="mt-24 min-h-screen">
            {!isLoading ? (
                <>
                <div 
                    className="bg-white h-[40vh] flex flex-col items-center justify-center px-10 py-10 shadow-sm">
                    <p  
                        className="font-bold text-black text-4xl">
                        Test Your Knowledge with Fun Quizzes
                    </p>
                    <p 
                        className="font-bold text-black opacity-50">
                        Explore thousands of quizzes created by our community or create your own!
                    </p>
                    <div 
                        className="flex flex-row gap-2 mt-2">
                        <button
                            className="bg-mainpink text-white font-semibold py-2 px-3 rounded-md"
                            onClick={() => router.push("/quiz/create")}
                        >
                            Create Quiz
                        </button>
                        <button
                            className="bg-none border-mainpink border-2 border-solid text-mainpink font-semibold py-2 px-3 rounded-md"
                            onClick={() => router.push("/quiz")}
                        >
                            Browse Quizzes
                        </button>
                    </div>
                </div> 
                <div 
                    className="bg-[#f9fafb] min-h-[30vh] flex flex-col px-10 py-5"
                >
                    <p 
                        className="font-semibold text-2xl"
                    >
                        Quizizz Features
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center mt-3 h-1/2 gap-3">
                        <div className="bg-white rounded-md px-2 py-2 shadow-md h-full flex flex-col justify-center">
                            <NotebookPen className="text-mainpink"/>
                            <p className="font-semibold text-sm">Create Exciting Quizzes</p>
                            <p className="font-semibold opacity-50 text-xs">Design engaging quizzes with ease and challenge your audience!</p>
                        </div>
                        <div className="bg-white rounded-md px-2 py-2 shadow-md h-full flex flex-col justify-center">
                            <LibraryBig className="text-mainpink"/>
                            <p className="font-semibold text-sm">Many Categories</p>
                            <p className="font-semibold opacity-50 text-xs">Explore a wide range of topics, from tech to general knowledge!</p>
                        </div>
                        <div className="bg-white rounded-md px-2 py-2 shadow-md h-full flex flex-col justify-center">
                            <Palette className="text-mainpink"/>
                            <p className="font-semibold text-sm">Interactive & User-Friendly</p>
                            <p className="font-semibold opacity-50 text-xs">Enjoy a seamless quiz-taking experience with a clean and engaging interface!</p>
                        </div>
                        <div className="bg-white rounded-md px-2 py-2 shadow-md h-full flex flex-col justify-center">
                            <CheckCheck className="text-mainpink"/>
                            <p className="font-semibold text-sm">Instant Feedback</p>
                            <p className="font-semibold opacity-50 text-xs">Get immediate results and explanations to enhance your learning!</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-min-[30vh] flex flex-col px-10 py-5">
                    <div className="flex flex-row items-center justify-between">
                        <p className="font-semibold text-2xl">Featured Quizzes</p>
                        <Link 
                        className="font-semibold text-mainpink hover:text-hoverpink"
                        href={"/quiz"}
                        >
                            View All
                        </Link>
                    </div>
                    <div className="w-full h-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
                        {quizzes ? (
                            <>
                            {Array.from({length: Math.min(4,quizzes.length)},(_,i) => (
                                <QuizCardNoOptions quiz={quizzes[i]} key={quizzes[i].id}/>
                            ))}
                            </>
                        ) : (
                            <p className="font-semibold opacity-50">There's no available quizzes right now</p>
                        )}
                    </div>
                </div>
                </>
            ) : (
                <p className="font-semibold text-4xl">Loading...</p>
            )}
        </div>
    );
}