import {
  AlertDialog,
  // AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "../ui/button";
// import { Button } from "@/components/ui/button"

interface ModalComponentProps {
  title: string;
  description?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  childComponent?: ReactNode;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  description,
  open,
  setOpen,
  childComponent
}) => {
  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center">
          {childComponent}
        </div>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction> */}
          <Button onClick={() => {setOpen(!open)}}>閉じる</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
