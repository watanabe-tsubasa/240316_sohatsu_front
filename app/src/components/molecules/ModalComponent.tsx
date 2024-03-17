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
import { ReactNode } from "react";
// import { Button } from "@/components/ui/button"

interface ModalComponentProps {
  title: string;
  description?: string;
  open: boolean;
  childComponent?: ReactNode;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  description,
  open,
  childComponent
}) => {
  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent className="p-0 pt-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center w-full">
          <div className="w-[350px]">
            {childComponent}
          </div>
        </div>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction> */}
          {/* <Button onClick={() => {setOpen(!open)}}>閉じる</Button> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
