import p5 from "p5";
import { useEffect, useRef, useState } from 'react';

export const P5Component = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef('start');
  const [score, setScore] = useState(5);
  const [price, setPrice] = useState(0);
  const barX = useRef(0);
  const barWidth = 20;
  const speed = 2;
  const scanAreaWidth = 100;
  const windowHeight = 400;
  const windowWidth = 600;

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
        p.textSize(180);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('スタート', p.width / 2, p.height / 2);
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
        p.textSize(34);
        p.text(`残りお買い物点数: ${score}`, 220, 30);
        p.text(`金額: ${price}`, 120, 100);

        p.fill(100);
        p.rect(0, 300, p.width, 400);
        p.textSize(74);
        p.fill(0);
        p.text(`バーが所定の位置に来たらクリック`, 300, 280);

        if (score <= 0) {
          gameStateRef.current = 'gameOver';
        }
      };

      const drawGameOverScreen = (p: p5) => {
        p.textSize(82);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(`ありがとうございました。\nお会計${price}円です！`, p.width / 2, p.height / 2 - 20);
        p.text('閉じる', (p.width * 3) / 4, (p.height * 3) / 4 + 20);
      };

      p.mouseClicked = () => {
        if (gameStateRef.current === 'start') {
          gameStateRef.current = 'game';
        } else if (gameStateRef.current === 'gameOver') {
          gameStateRef.current = 'start';
          setScore(10);
          setPrice(0);
          barX.current = 0;
        } else if (gameStateRef.current === 'game') {
          checkScan(p);
        }
      };

      const checkScan = (p: p5) => {
        if (barX.current > (p.width - scanAreaWidth) / 2 && barX.current < (p.width + scanAreaWidth) / 2) {
          setScore(score - 1);
          setPrice(price + Math.floor(p.random(1, 20)) * 100 + 98);
        }
      };
    };

    if (sketchRef.current) {
      const myP5 = new p5(sketch, sketchRef.current);
      return () => {
        myP5.remove();
      };
    }
  }, [score, price]); // 依存配列には score と price のみを含めます

  return <div ref={sketchRef}></div>;
};
