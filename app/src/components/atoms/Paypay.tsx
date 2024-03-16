import { useRef } from "react";
import { useToast } from "../Hooks/useToast";

export const Paypay = () => {
   
  const audioRef = useRef<HTMLAudioElement>(null);

  // 再生ボタンのイベントハンドラ
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // // 一時停止ボタンのイベントハンドラ
  // const pauseAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //   }
  // };

  // // 停止ボタンのイベントハンドラ
  // const stopAudio = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause(); // 一時停止
  //     audioRef.current.currentTime = 0; // 再生位置を先頭に戻す
  //   }
  // };
  const showToast = useToast({status: 'error', title: 'Paypayでは', message: 'お支払いできません'});
  const handleClickIcon = () => {
    playAudio();
    setTimeout(() => {
      showToast()
    }, 1000)
  }

  return (
    <div>
      {/* audio 要素に ref を設定 */}
      <audio ref={audioRef} src="paypay.mp3" preload="auto"></audio>
      <img
       src='paypay.jpg'
       alt="paypay.jpg"
       onClick={handleClickIcon}
       className="shadow-lg rounded-3xl"
      />

    </div>
  );
}