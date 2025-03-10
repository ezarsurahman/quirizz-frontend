import exp from "constants"
import { DateRange } from "react-day-picker"

export interface Quiz {
    id: string,
    title: string,
    description:string,
    created_at: string,
    category: string,
    difficulty: string,
}

export interface QuizCardNoOptionsInterface {
    quiz: any,
}

export interface QuizTileInterface {
    quizzes: any[],
    onDelete: (id:string) => void
}

export interface DifficultyTextInterface {
    difficulty: string,
    size?: string
}
export interface CategoryTextInterface {
    category: string,
    size?: string,
}

export interface SettingsDropDownInterface {
    id: string,
    onDelete: (id:string) => void,
}

export interface SearchAndFilterInterface {
    onChange: (
        search:string,
        category:string,
        difficulty:string,
        date:DateRange | undefined,
    ) => void,
}