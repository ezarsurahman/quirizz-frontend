interface Choices {
    question:string,
    choice_text:string
}

interface Question {
    id: string,
    quiz: string,
    number: number,
    type: string,
    problem: string,
    answer: string,
    choices?: Choices[]
}

interface QuestionListInterface {
    questions: Question[]
    deleteQuestion: (id:string) => void
    updateQuestion: (id: string, question: any) => void
    createQuestion: (question: any) => void
    editToggle: () => void
    createMode: boolean
    submitted:boolean
}

interface QuestionCardInterface {
    num: number
    question: Question
    editToggle: (id: string) => void
    submitted:boolean
}
interface QuestionEditCardInterface {
    num: number
    question: Question
    deleteQuestion: (id:string) => void
    updateQuestion: (id: string, question: any) => any
    editToggle: (id: string) => void
    submitted: boolean
}

interface QuestionCreateCardInterface {
    num: number
    createQuestion: (question: any) => any
    editToggle: () => void
}

interface QuestionCategoryChipInterface {
    type: string
}
interface ChoicesBasedOnTypeInterface {
    type: string
    choices?: Choices[]
}

interface RadioGroupsInterface {
    choices: string[]
    editable?: boolean
    [key: string]: any;
    onDelete?: (id:string) => void
    setChoices?: (choices:string[]) => void
}