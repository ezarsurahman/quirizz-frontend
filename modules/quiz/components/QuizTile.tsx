import { QuizTileInterface } from "./interface";
import { QuizCard } from "./QuizCard";

export const QuizTile = ({quizzes}:QuizTileInterface) => {
    
    return (
        <div className="w-4/5 grid grid-cols-4 gap-3">
            {quizzes.map((quiz) => {
                return (<QuizCard 
                            quiz={quiz}
                            key={quiz.id}></QuizCard>)
            })}
        </div>
    );
}
 
