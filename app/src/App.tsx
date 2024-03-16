import { useEffect, useState } from "react"
import { BaseDrower } from "./components/DrawerComponent"
import { Button } from "./components/ui/button";
import { P5Component } from "./components/atoms/P5Component";
import { ModalComponent } from "./components/ModalComponent";
import { BarcodeReader } from "./components/atoms/BarcodeReader";


function App() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [barcode, setBarcode] = useState('');
  useEffect(() => {
    console.log(openModal);
  }, [openModal])

  const handleBarcodeDetect = () => {
    setBarcode('');
    setOpenModal(true);
  }
  return (
    <>
      <Button onClick={() => {setOpen(!open)}}>open</Button>
      <Button onClick={handleBarcodeDetect}>openModal</Button>
      <ModalComponent
       title="バーコードをスキャンしてください"
       open={openModal}
       setOpen={setOpenModal}
       childComponent={
        <BarcodeReader
         barcode={barcode}
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
      {barcode}
    </>
  )
}

export default App
