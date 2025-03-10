import { Quiz } from "../../components/interface";

export interface QuizDetailCardInteface {
    quiz: any
    onDelete: (id:string) => void
}