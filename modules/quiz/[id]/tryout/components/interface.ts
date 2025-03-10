interface QuestionNavInterface {
    question_count:number
    setCurrNumber: (num:number) => void
    currNumber: number
}

interface QuestionNavButtonInterface {
    num:number,
    isSelected: boolean,
    setCurrNumber: (num:number) => void
}

interface AnswerCardInterface {
    questions: any[]
    currNumber: number
    setCurrNumber: (num:number) => void
    userAnswer: {
        question: string,
        answer: string,
    }[]
    setUserAnswer: any
    onSubmit: (submitted:boolean) => any
    onSave: (submitted:boolean) => any
}

interface AnswerRadioGroupInterface {
    choices: string[]
    currNumber:number
    userAnswer: {
        question: string,
        answer: string,
    }[]
    updateAnswer: any
}