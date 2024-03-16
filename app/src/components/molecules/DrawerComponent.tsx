import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from "@/components/ui/drawer"
import { ReactNode, SetStateAction } from "react";

interface BaseDrowerProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  childComponent: ReactNode;
}

export const BaseDrower: React.FC<BaseDrowerProps> = ({
  title,
  description,
  open,
  setOpen,
  childComponent
}) => {

  return (
    <Drawer open={open}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <div className="w-full max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              {childComponent}
            </div>
          </div>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => {setOpen(!open)}}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
