import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { CirclePlus, ToggleLeft } from "lucide-react";
import { QuestionEditCard } from "./QuestionEditCard";
import { QuestionCreateCard } from "./QuestionCreateCard";

export const QuestionList = ({ questions, deleteQuestion, updateQuestion, createQuestion }: QuestionListInterface) => {
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [createMode, setCreateMode] = useState<boolean>(false);

    const toggleEditMode = (id: string) => {
        setEditMode((current) => ({ ...current, [id]: !current[id] }));
    };

    const toggleCreateCard = () => {
        setCreateMode(!createMode)
    }

    const onCreate = (question:any) => {
        createQuestion(question)
        toggleCreateCard()
    }

    return (
        <div className="flex flex-col gap-2">
            {questions.map((question,i) => (
                <div key={i}>
                    {editMode[question.id] ? (
                        <QuestionEditCard
                            question={question}
                            deleteQuestion={deleteQuestion}
                            updateQuestion={updateQuestion}
                            editToggle={toggleEditMode}
                            num={i+1}
                        />
                    ) : (
                        <QuestionCard 
                        question={question} 
                        editToggle={toggleEditMode}
                        num={i+1}
                        />
                    )}
                </div>
            ))}
            {createMode ? (
                <QuestionCreateCard 
                num={questions.length+1}
                createQuestion={createQuestion}
                editToggle={toggleCreateCard}
                />
            ):(
                <Button
                variant={"outline"}
                className="font-semibold text-mainpink border-mainpink hover:text-mainpink"
                onClick={toggleCreateCard}
                >
                    <CirclePlus /> Create Question
                </Button>
            )}
        </div>
    );
};

export default QuestionList;