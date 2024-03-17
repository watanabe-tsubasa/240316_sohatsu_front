import p5 from "p5";
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";

interface P5ComponentProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const P5Component: React.FC<P5ComponentProps> = ({ open, setOpen}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const sketchRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef('start');
  const [score, setScore] = useState(5);
  const [clickCount, setClickCount] = useState(0);
  const barX = useRef(0);
  const barWidth = 10;
  const speed = 5;
  const scanAreaWidth = 50;
  const windowHeight = 400;
  const windowWidth = 350;

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(windowWidth, windowHeight);
        barX.current = 0;
      };

      p.draw = () => {
        p.background(220);
        if (gameStateRef.current === 'start') {
          drawStartScreen(p);
        } else if (gameStateRef.current === 'game') {
          drawGameScreen(p);
        } else if (gameStateRef.current === 'gameOver') {
          drawGameOverScreen(p);
        }
      };

      const drawStartScreen = (p: p5) => {
        p.textSize(50);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('挑戦する', p.width / 2, p.height / 2);
      };

      const drawGameScreen = (p: p5) => {
        p.fill(120, 200, 200);
        p.rect((p.width - scanAreaWidth) / 2, 0, scanAreaWidth, p.height);
        p.fill(255, 0, 0);
        p.rect(barX.current, 0, barWidth, p.height);

        // バーを移動
        barX.current += speed;
        if (barX.current > p.width) {
          barX.current = 0;
        }

        p.fill(0);
        p.textSize(20);
        p.text(`成功数: ${5-score} / 5`, 10, 30);
 
        p.textSize(20);
        p.text(`残り回数: ${10-clickCount}`, 10, 60);

        p.fill(100);
        p.rect(0, 300, p.width, 400);
        p.textSize(20);
        p.fill(0);
        p.text(`バーが所定の位置に来たらクリック`, 10, 280);

        if (clickCount === 10) {
          gameStateRef.current = 'start';
        }

        if (score <= 0) {
          gameStateRef.current = 'gameOver';
        }
      };

      const drawGameOverScreen = (p: p5) => {
        p.textSize(20);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('おめでとう！', (p.width) / 2, (p.height) / 2);
      };

      p.mouseClicked = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          setClickCount(prevCount => prevCount + 1);
        }
        if (gameStateRef.current === 'start') {
          setClickCount(0);
          setScore(5);
          gameStateRef.current = 'game';
        } else if (gameStateRef.current === 'gameOver') {
          gameStateRef.current = 'start';
          setScore(5);
          barX.current = 0;
          setIsSuccess(true);
        } else if (gameStateRef.current === 'game') {
          checkScan(p);
        }
      };

      const checkScan = (p: p5) => {
        if (barX.current > (p.width - scanAreaWidth) / 2 && barX.current < (p.width + scanAreaWidth) / 2) {
          setScore(score - 1);
        }
      };
    };

    if (sketchRef.current) {
      const myP5 = new p5(sketch, sketchRef.current);
      return () => {
        myP5.remove();
      };
    }
  }, [score, clickCount]); // 依存配列には score と price のみを含めます

  return (
    <div className="flex flex-col justify-center space-y-2 ">
      <div ref={sketchRef}></div>
      <Button className="flex-grow" disabled={!isSuccess} onClick={() => {setOpen(!open)}}>閉じる</Button>
    </div>

    );
};
