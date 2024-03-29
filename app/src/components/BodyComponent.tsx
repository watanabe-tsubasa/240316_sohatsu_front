import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ModalComponent } from "./molecules/ModalComponent";
import { BarcodeReader } from "./atoms/BarcodeReader";
import { BaseDrower } from "./molecules/DrawerComponent";
import { P5Component } from "./atoms/P5Component";
import { ProductCard } from "./molecules/ProductCard";
import { CheckCircledIcon, ColumnsIcon } from "@radix-ui/react-icons";
import { useToast } from "./Hooks/useToast";
import { Toaster } from "sonner";
import { fetchWithScan } from "@/utils/fetcher";
import { Paypay } from "./atoms/Paypay";

export const BodyComponent = () =>  {
  const [open, setOpen] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openTrapModal, setOpenTrapModal] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [JANList, setJANList] = useState(['4549414082166', '4902102141253']);
  const [toastMessage, setToastMessage] = useState('');

  const handleBarcodeDetect = () => {
    setBarcode('');
    const randomNumber = Math.random();
    console.log(randomNumber);
    if(randomNumber < 0.3) {
      setOpenTrapModal(!openTrapModal);
    } else {
      setOpenModal(true);
    }
  };
  useEffect(() => {
    if(barcode !== '') {
      setJANList(current => [...current, barcode])
      handleFetchAndToast(barcode);
    }
  }, [barcode]);
  const handleFetchAndToast = async (JAN: string) => {
    const data = await fetchWithScan(JAN)
    setToastMessage(data.message);
  };
  
  const stopPurchase = () => {
    setJANList(current => [...current].slice(0, current.length - 1))
  };
  const showToast = useToast({
    status: 'success',
    title:'お買い物情報',
    message: toastMessage,
    func: stopPurchase,
    label: 'やめる'
  });
  useEffect(() => {
    if(toastMessage !== '') {
      showToast();
      setToastMessage('');
    }
  }, [toastMessage, showToast]);
  
  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center mx-4 my-2 space-y-2 overflow-scroll">
        {JANList.map((elem, index) => <ProductCard
          JAN={elem}
          key={index}
          index={index}
          JANList={JANList}
          setJANList={setJANList}
        />)}
      </div>
      <div className="fixed z-40 flex justify-center w-full p-2 bg-white bg-opacity-50 bottom-24">
        <Button className="flex h-12 space-x-2" onClick={handleBarcodeDetect}>
          <ColumnsIcon />
          <p>バーコードスキャン</p>
        </Button>
      </div>
      <div className="fixed bottom-0 z-40 flex justify-around w-full p-4 bg-white bg-opacity-50">
        <Button className="w-32 h-12" onClick={() => {setOpen(!open)}}>
          お知らせ
        </Button>        
        <Button className="flex w-32 h-12 space-x-2" onClick={() => {setOpenPay(!openPay)}}>
          <CheckCircledIcon />
          <p>お支払い</p>
        </Button>        
      </div>
      <ModalComponent
        title="バーコードをスキャンしてください"
        open={openModal}
        childComponent={
          <BarcodeReader
            setBarcode={setBarcode}
            isScanning={openModal}
            setIsScanning={setOpenModal}
            open={openModal}
             setOpen={setOpenModal}
          />}
      />
      <ModalComponent
        title="スキャンゲーム"
        description="商品買いたければ頑張れ"
        open={openTrapModal}
        childComponent={<P5Component open={openTrapModal} setOpen={setOpenTrapModal} />}
      />
      <BaseDrower
        title="スキャンゲーム"
        description="商品買いたければ頑張れ"
        open={open}
        setOpen={setOpen}
        childComponent={<P5Component open={open} setOpen={setOpen} />}
      /> 
      <BaseDrower
        title="お支払い"
        description="ペイペイ！"
        open={openPay}
        setOpen={setOpenPay}
        childComponent={<Paypay />}
      /> 
      <Toaster position="top-center" richColors />
    </div>
  )
}