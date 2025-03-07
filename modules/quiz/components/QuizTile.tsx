import { QuizTileInterface } from "./interface";
import { QuizCard } from "./QuizCard";

export const QuizTile = ({quizzes, onDelete}:QuizTileInterface) => {
    
    return (
        <div className="">
            {quizzes.length === 0 ? (
                <div className="h-[75vh] flex items-center justify-center">
                    <p>No quizzes found</p>
                </div>
            ) : (
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
                    {quizzes.map((quiz) => {
                        return (<QuizCard 
                                    quiz={quiz}
                                    key={quiz.id}
                                    onDelete={onDelete}/>)
                    })}
                </div>
            )}
        </div>
    );
}
 
