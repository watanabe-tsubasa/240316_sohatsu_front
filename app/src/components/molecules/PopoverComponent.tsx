import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RowsIcon } from "@radix-ui/react-icons"

interface PopoverComponentProps {
  title: string;
  description: string;
  contents: string[];
}

export const PopoverComponent: React.FC<PopoverComponentProps> = ({title, description, contents}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button variant="outline" className="px-3 py-2 rounded"><RowsIcon /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="">
            {contents.map((elem, index) => (
              <div key={index} className="">
                {elem}
              </div>))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
