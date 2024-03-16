import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TrashIcon } from "@radix-ui/react-icons"
import { sampleData } from "@/utils/sampleData"
import { useState } from "react"

interface ProductCardProps {
  JAN: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ JAN }) => {
  const [count, setCount] = useState(1);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = Number(e.target.value);
    setCount(newNumber);
  }
  const selectedItem = sampleData.filter(elem => elem.JAN === JAN)[0]
  if (!selectedItem) {
    return <div></div>;
  }
  const imgPath = `https://www.aeonnetshop.com/img/goods/0105/00000000000000/PC/L/${selectedItem.JAN}.jpg`
  return (
    <Card className="w-full p-2">
      <CardContent className="flex items-center justify-between p-0 space-x-1">
        <img
         className="w-20 h-20"
         src={imgPath}
         alt={`${selectedItem.name}.jpg`}
        />
        <CardTitle className="flex-grow">{selectedItem.name}</CardTitle>
        <div className="flex-col space-y-1">
          <Button variant="outline" className="w-12"><TrashIcon /></Button>
          <Input onChange={handleInput} className="w-12" value={count} type="number"></Input>
        </div>
      </CardContent>
    </Card>
  )
}