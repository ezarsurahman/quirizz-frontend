import { Quiz } from "../../components/interface";

export interface QuizDetailCardInteface {
    quiz: Quiz
    onDelete: (id:string) => void
}