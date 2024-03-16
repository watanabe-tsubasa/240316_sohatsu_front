import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';

interface BarcodeReaderProps {
  barcode: string;
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BarcodeReader: React.FC<BarcodeReaderProps> = ({
  barcode,
  setBarcode,
  isScanning,
  setIsScanning
}) => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const decode = async () => {
      if (!webcamRef.current || !isScanning) return;

      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const result = await codeReader.decodeFromImage(undefined, imageSrc);
          if (result) {
            setBarcode(result.getText());
            setIsScanning(false);  // バーコードを検出したらスキャンを停止
          }
        } catch (error) {
          // console.log(error)
        }
      }

      if (isScanning) {
        requestAnimationFrame(decode);  // 画面更新のたびにデコードを試みる
      }
    };

    decode();

    // クリーンアップ関数
    // return () => {
    //   setIsScanning(false);
    // };
  // 依存性配列にsetBarcodeとsetIsScanningを追加
  }, [isScanning, setBarcode, setIsScanning]);

  return (
    <div className="w-full h-32 overflow-hidden"> {/* ここで高さと幅を設定 */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'environment' }}
        className="w-auto" // Webcamの幅を自動調整
      />
    </div>
  );
};
