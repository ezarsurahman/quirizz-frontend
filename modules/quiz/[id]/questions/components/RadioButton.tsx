import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2Icon } from "lucide-react"

export function RadioGroups({choices, editable, setChoices=((choices) => {}), ...props}:RadioGroupsInterface) {

  const deleteChoice = (index:number) => {
    let tempChoices = choices
    tempChoices = tempChoices.filter((_,i) => i !== index)
    setChoices(tempChoices)
  }

  return (
    <RadioGroup defaultValue="" {...props} className="mt-3">
      {choices.map((choice,index) => {
        return (
        <div className="flex items-center space-x-2 mb-2" key={choice}>
          <RadioGroupItem value={choice} id={`r${index+1}`} />
          <Label htmlFor={`r${index+1}`}>{choice}</Label>
          {editable ?(
            <button type="button" onClick={() => {deleteChoice(index)}}>
              <Trash2Icon className="h-5 w-5 text-red-500"/>
            </button>
          ) : (
            ""
          )}
        </div>
        )
      })}
    </RadioGroup>
  )
}
