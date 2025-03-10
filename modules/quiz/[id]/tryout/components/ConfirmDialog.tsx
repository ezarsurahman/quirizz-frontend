import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ConfirmDialogInterface {
  onClick:() => void,
  className:any
}

export function ConfirmDialog( {onClick, className}: ConfirmDialogInterface) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>Submit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit answers?</DialogTitle>
          <DialogDescription>
            You won't be able to edit the answers to this quiz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-end">
            <DialogClose asChild>
                <Button
                    variant="outline"
                >No
                </Button>
            </DialogClose>
            <DialogClose asChild>
                <Button 
                    type="submit"
                    className="bg-mainpink hover:bg-hoverpink"
                    onClick={onClick}
                >
                    Yes
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
