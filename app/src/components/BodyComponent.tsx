import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ModalComponent } from "./molecules/ModalComponent";
import { BarcodeReader } from "./atoms/BarcodeReader";
import { BaseDrower } from "./molecules/DrawerComponent";
import { P5Component } from "./atoms/P5Component";
import { ProductCard } from "./molecules/ProductCard";
import { CheckCircledIcon, ColumnsIcon } from "@radix-ui/react-icons";


export const BodyComponent = () =>  {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [JANList, setJANList] =useState(['4549414082166', '4902102141253', 'slfja;fj']);
  useEffect(() => {
    console.log(openModal);
  }, [openModal])

  const handleBarcodeDetect = () => {
    setBarcode('');
    setOpenModal(true);
  }

  useEffect(() => {
    if(barcode !== '') {
      setJANList(current => [...current, barcode])
    }
  }, [barcode])
  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center mx-4 my-2 space-y-2 overflow-scroll">
        {JANList.map((elem, index) => <ProductCard JAN={elem} key={index} />)}
      </div>
      <div className="fixed z-40 flex justify-center w-full p-2 bg-white bg-opacity-50 bottom-24">
        <Button className="flex h-12 space-x-2" onClick={handleBarcodeDetect}>
          <ColumnsIcon />
          <p>バーコードスキャン</p>
        </Button>
      </div>
      <div className="fixed bottom-0 z-40 flex justify-around w-full p-4 bg-white bg-opacity-50">
        <Button className="w-32 h-12" onClick={() => {setOpen(!open)}}>openModal</Button>        
        <Button className="flex w-32 h-12 space-x-2" onClick={() => {setOpen(!open)}}>
          <CheckCircledIcon />
          <p>お支払い</p>
        </Button>        
      </div>
      <ModalComponent
        title="バーコードをスキャンしてください"
        open={openModal}
        setOpen={setOpenModal}
        childComponent={
          <BarcodeReader
          setBarcode={setBarcode}
          isScanning={openModal}
          setIsScanning={setOpenModal}
          />}
        />
      <BaseDrower
        title="スキャンゲーム"
        description="商品買いたければ頑張れ"
        open={open}
        childComponent={<P5Component />}
      />  
    </div>
  )
}