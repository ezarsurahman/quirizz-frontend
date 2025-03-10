import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { CirclePlus, ToggleLeft } from "lucide-react";
import { QuestionEditCard } from "./QuestionEditCard";
import { QuestionCreateCard } from "./QuestionCreateCard";

export const QuestionList = ({ questions, deleteQuestion, updateQuestion, createQuestion, editToggle, createMode, submitted }: QuestionListInterface) => {
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});


    const toggleEditMode = (id: string) => {
        setEditMode((current) => ({ ...current, [id]: !current[id] }));
    };

    


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
                            submitted={submitted}
                        />
                    ) : (
                        <QuestionCard 
                        question={question} 
                        editToggle={toggleEditMode}
                        num={i+1}
                        submitted={submitted}
                        />
                    )}
                </div>
            ))}
            {createMode ? (
                <QuestionCreateCard 
                num={questions.length+1}
                createQuestion={createQuestion}
                editToggle={editToggle}
                />
            ):(
                <>
                {!submitted ? (
                    <Button
                    variant={"outline"}
                    className="font-semibold text-mainpink border-mainpink hover:text-mainpink"
                    onClick={editToggle}
                    >
                        <CirclePlus /> Create Question
                    </Button>
                ) : (
                    ""
                )}
                </>
            )}
        </div>
    );
};

export default QuestionList;