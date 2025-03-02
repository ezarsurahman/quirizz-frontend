import exp from "constants"

export interface Quiz {
    id: string,
    title: string,
    description:string,
    created_at: string,
    category: string,
    difficulty: string,
}

export interface QuizCardInterface {
    quiz: Quiz
}

export interface QuizTileInterface {
    quizzes: Quiz[]
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
}