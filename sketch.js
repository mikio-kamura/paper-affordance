//------- Condortable p5 world :))))) -------//

let canvas;

let sketch = function (p) {
  let finPosX = [];
  let finPosY = [];
  let thumbRootX = [];
  let thumbRootY = [];

  let flag = 1;
  let handImage = [];
  let circleMin = 10;

  let jabaraImage = [];
  let closeLevel;
  let prevCloseLevel = 19; // 直前のcloseLevelを保存
  let waitMilSec = 800;

  let drawSimpleImage = [];
  let drawSimpleLevel = 0;

  let fingerDist = [];
  let graspLevel = [];

  let graspMin = 50;
  let graspMax = 280;
  let timeoutId;

  // 手の軌道追跡用の変数
  let handTrajectory = {
    prevX: 0,
    prevY: 0,
    currentDirection: 'none', // 'right', 'down', 'left', 'up'
    directionSequence: [], // 方向の履歴を保存
    rotationDirection: 'none', // 'clockwise', 'counterclockwise'
    lastProcessedDirection: 'none' // 最後に処理した方向
  };

  p.setup = function () {
    // cannot use p.preload so load here using callback...
    // load hand images
    {
      p.loadImage("hands/1.jpg", function (loadedImage) {
        handImage[0] = loadedImage;
      });
      p.loadImage("hands/2.jpg", function (loadedImage) {
        handImage[1] = loadedImage;
      });
      p.loadImage("hands/3.jpg", function (loadedImage) {
        handImage[2] = loadedImage;
      });
      p.loadImage("hands/4.jpg", function (loadedImage) {
        handImage[3] = loadedImage;
      });
      p.loadImage("hands/5.jpg", function (loadedImage) {
        handImage[4] = loadedImage;
      });
      p.loadImage("hands/6.jpg", function (loadedImage) {
        handImage[5] = loadedImage;
      });
      p.loadImage("hands/7.jpg", function (loadedImage) {
        handImage[6] = loadedImage;
      });
      p.loadImage("hands/8.jpg", function (loadedImage) {
        handImage[7] = loadedImage;
      });
      p.loadImage("hands/9.jpg", function (loadedImage) {
        handImage[8] = loadedImage;
      });
      p.loadImage("hands/10.jpg", function (loadedImage) {
        handImage[9] = loadedImage;
      });
      p.loadImage("hands/11.jpg", function (loadedImage) {
        handImage[10] = loadedImage;
      });
      p.loadImage("hands/12.jpg", function (loadedImage) {
        handImage[11] = loadedImage;
      });
      p.loadImage("hands/13.jpg", function (loadedImage) {
        handImage[12] = loadedImage;
      });
      p.loadImage("hands/14.jpg", function (loadedImage) {
        handImage[13] = loadedImage;
      });
      p.loadImage("hands/15.jpg", function (loadedImage) {
        handImage[14] = loadedImage;
      });
      p.loadImage("hands/16.jpg", function (loadedImage) {
        handImage[15] = loadedImage;
      });
      p.loadImage("hands/17.jpg", function (loadedImage) {
        handImage[16] = loadedImage;
      });
      p.loadImage("hands/18.jpg", function (loadedImage) {
        handImage[17] = loadedImage;
        handImage[18] = loadedImage;
      });
    }
    {
      p.loadImage("videos/jabara/01.png", function (loadedImage) {
        jabaraImage[0] = loadedImage;
      });
      p.loadImage("videos/jabara/02.png", function (loadedImage) {
        jabaraImage[1] = loadedImage;
      });
      p.loadImage("videos/jabara/03.png", function (loadedImage) {
        jabaraImage[2] = loadedImage;
      });
      p.loadImage("videos/jabara/04.png", function (loadedImage) {
        jabaraImage[3] = loadedImage;
      });
      p.loadImage("videos/jabara/05.png", function (loadedImage) {
        jabaraImage[4] = loadedImage;
      });
      p.loadImage("videos/jabara/06.png", function (loadedImage) {
        jabaraImage[5] = loadedImage;
      });
      p.loadImage("videos/jabara/07.png", function (loadedImage) {
        jabaraImage[6] = loadedImage;
      });
      p.loadImage("videos/jabara/08.png", function (loadedImage) {
        jabaraImage[7] = loadedImage;
      });
      p.loadImage("videos/jabara/09.png", function (loadedImage) {
        jabaraImage[8] = loadedImage;
      });
      p.loadImage("videos/jabara/10.png", function (loadedImage) {
        jabaraImage[9] = loadedImage;
      });
      p.loadImage("videos/jabara/11.png", function (loadedImage) {
        jabaraImage[10] = loadedImage;
      });
      p.loadImage("videos/jabara/12.png", function (loadedImage) {
        jabaraImage[11] = loadedImage;
      });
      p.loadImage("videos/jabara/13.png", function (loadedImage) {
        jabaraImage[12] = loadedImage;
      });
      p.loadImage("videos/jabara/14.png", function (loadedImage) {
        jabaraImage[13] = loadedImage;
      });
      p.loadImage("videos/jabara/15.png", function (loadedImage) {
        jabaraImage[14] = loadedImage;
      });
      p.loadImage("videos/jabara/16.png", function (loadedImage) {
        jabaraImage[15] = loadedImage;
      });
      p.loadImage("videos/jabara/17.png", function (loadedImage) {
        jabaraImage[16] = loadedImage;
      });
      p.loadImage("videos/jabara/18.png", function (loadedImage) {
        jabaraImage[17] = loadedImage;
      });
      p.loadImage("videos/jabara/19.png", function (loadedImage) {
        jabaraImage[18] = loadedImage;
      });
      p.loadImage("videos/jabara/20.png", function (loadedImage) {
        jabaraImage[19] = loadedImage;
      });
    }
    {
      p.loadImage("videos/draw-simple/01.png", function (loadedImage) {
        drawSimpleImage[0] = loadedImage;
      });
      p.loadImage("videos/draw-simple/02.png", function (loadedImage) {
        drawSimpleImage[1] = loadedImage;
      });
      p.loadImage("videos/draw-simple/03.png", function (loadedImage) {
        drawSimpleImage[2] = loadedImage;
      });
      p.loadImage("videos/draw-simple/04.png", function (loadedImage) {
        drawSimpleImage[3] = loadedImage;
      });
      p.loadImage("videos/draw-simple/05.png", function (loadedImage) {
        drawSimpleImage[4] = loadedImage;
      });
      p.loadImage("videos/draw-simple/06.png", function (loadedImage) {
        drawSimpleImage[5] = loadedImage;
      });
      p.loadImage("videos/draw-simple/07.png", function (loadedImage) {
        drawSimpleImage[6] = loadedImage;
      });
      p.loadImage("videos/draw-simple/08.png", function (loadedImage) {
        drawSimpleImage[7] = loadedImage;
      });
      p.loadImage("videos/draw-simple/09.png", function (loadedImage) {
        drawSimpleImage[8] = loadedImage;
      });
      p.loadImage("videos/draw-simple/10.png", function (loadedImage) {
        drawSimpleImage[9] = loadedImage;
      });
      p.loadImage("videos/draw-simple/11.png", function (loadedImage) {
        drawSimpleImage[10] = loadedImage;
      });
      p.loadImage("videos/draw-simple/12.png", function (loadedImage) {
        drawSimpleImage[11] = loadedImage;
      });
      p.loadImage("videos/draw-simple/13.png", function (loadedImage) {
        drawSimpleImage[12] = loadedImage;
      });
      p.loadImage("videos/draw-simple/14.png", function (loadedImage) {
        drawSimpleImage[13] = loadedImage;
      });
      p.loadImage("videos/draw-simple/15.png", function (loadedImage) {
        drawSimpleImage[14] = loadedImage;
      });
      p.loadImage("videos/draw-simple/16.png", function (loadedImage) {
        drawSimpleImage[15] = loadedImage;
      });
      p.loadImage("videos/draw-simple/17.png", function (loadedImage) {
        drawSimpleImage[16] = loadedImage;
      });
      p.loadImage("videos/draw-simple/18.png", function (loadedImage) {
        drawSimpleImage[17] = loadedImage;
      });
      p.loadImage("videos/draw-simple/19.png", function (loadedImage) {
        drawSimpleImage[18] = loadedImage;
      });
      p.loadImage("videos/draw-simple/20.png", function (loadedImage) {
        drawSimpleImage[19] = loadedImage;
      });
      p.loadImage("videos/draw-simple/21.png", function (loadedImage) {
        drawSimpleImage[20] = loadedImage;
      });
      p.loadImage("videos/draw-simple/22.png", function (loadedImage) {
        drawSimpleImage[21] = loadedImage;
      });
      p.loadImage("videos/draw-simple/23.png", function (loadedImage) {
        drawSimpleImage[22] = loadedImage;
      });
      p.loadImage("videos/draw-simple/24.png", function (loadedImage) {
        drawSimpleImage[23] = loadedImage;
      });
      p.loadImage("videos/draw-simple/25.png", function (loadedImage) {
        drawSimpleImage[24] = loadedImage;
      });
      p.loadImage("videos/draw-simple/26.png", function (loadedImage) {
        drawSimpleImage[25] = loadedImage;
      });
      p.loadImage("videos/draw-simple/27.png", function (loadedImage) {
        drawSimpleImage[26] = loadedImage;
      });
      p.loadImage("videos/draw-simple/28.png", function (loadedImage) {
        drawSimpleImage[27] = loadedImage;
      });
      p.loadImage("videos/draw-simple/29.png", function (loadedImage) {
        drawSimpleImage[28] = loadedImage;
      });
      p.loadImage("videos/draw-simple/30.png", function (loadedImage) {
        drawSimpleImage[29] = loadedImage;
      });
      p.loadImage("videos/draw-simple/31.png", function (loadedImage) {
        drawSimpleImage[30] = loadedImage;
      });
      p.loadImage("videos/draw-simple/32.png", function (loadedImage) {
        drawSimpleImage[31] = loadedImage;
      });
    }

    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    console.log(p.windowWidth, p.windowHeight);
    canvas.id("canvas");

    // mode settings
    {
      p.blendMode(p.ADD);
      p.rectMode(p.RADIUS);
      p.imageMode(p.CENTER);
    }
  };

  p.draw = function () {
    // p.background(246,3*(p.sin(p.frameCount*0.01)+1));
    p.clear();

    p.blendMode(p.ADD);
    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined) {
        p.stroke(0, 0, 255);
        p.strokeWeight(3);

        p.calcFingerPos();
        p.trackHandTrajectory(); // 手の軌道追跡を呼び出す
        p.interaction();

        // デバッグ情報を表示
        p.displayDebugInfo();
      }
    }
  };

  // デバッグ情報表示関数
  p.displayDebugInfo = function () {
    p.push();
    p.blendMode(p.NORMAL);
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(1);
    p.textSize(16);

    let debugText = [
      `方向: ${handTrajectory.currentDirection}`,
      `回転方向: ${handTrajectory.rotationDirection}`,
      `方向履歴: [${handTrajectory.directionSequence.join(', ')}]`,
      `画像インデックス: ${drawSimpleState.imageIndex}`,
      `完了周数: ${drawSimpleState.completedCircles}/${drawSimpleState.totalCircles}`
    ];

    for (let i = 0; i < debugText.length; i++) {
      p.text(debugText[i], 10, 30 + i * 20);
    }

    // 手の位置を可視化
    if (finPosX[0] && finPosX[0][1] !== undefined) {
      p.fill(255, 0, 0);
      p.noStroke();
      p.ellipse(finPosX[0][1], finPosY[0][1], 10, 10);
    }

    p.pop();
  };

  p.calcFingerPos = function () {
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      finPosX[i] = [];
      finPosY[i] = [];
      for (let j = 0; j < 5; j++) {
        finPosX[i][j] =
          p.width - detections.multiHandLandmarks[i][4 * (j + 1)].x * p.width;
        finPosY[i][j] =
          detections.multiHandLandmarks[i][4 * (j + 1)].y * p.height;
      }
      thumbRootX[i] = p.width - detections.multiHandLandmarks[i][2].x * p.width;
      thumbRootY[i] = detections.multiHandLandmarks[i][2].y * p.height;
    }
  };

  // 手の軌道追跡関数
  p.trackHandTrajectory = function () {
    if (finPosX[0] && finPosX[0][1] !== undefined) {
      let currentX = finPosX[0][1];
      let currentY = finPosY[0][1];

      // 初回の初期化
      if (handTrajectory.prevX === 0 && handTrajectory.prevY === 0) {
        handTrajectory.prevX = currentX;
        handTrajectory.prevY = currentY;
        return;
      }

      // 方向の変化を検出
      let newDirection = p.detectDirection(currentX, currentY, handTrajectory.prevX, handTrajectory.prevY);

      if (newDirection !== handTrajectory.currentDirection && newDirection !== 'none') {
        handTrajectory.currentDirection = newDirection;

        // 方向履歴に追加
        if (handTrajectory.directionSequence.length < 4) {
          handTrajectory.directionSequence.push(newDirection);
        } else {
          handTrajectory.directionSequence.shift();
          handTrajectory.directionSequence.push(newDirection);
        }

        // 回転方向を検出
        handTrajectory.rotationDirection = p.detectRotationDirection(handTrajectory.directionSequence);
      }

      handTrajectory.prevX = currentX;
      handTrajectory.prevY = currentY;
    }
  };

  // 方向検出関数
  p.detectDirection = function (currentX, currentY, prevX, prevY) {
    let dx = currentX - prevX;
    let dy = currentY - prevY;

    // 最小移動量の閾値
    let threshold = 13;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      return 'none';
    }

    // 最も大きな変化の方向を検出
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'down' : 'up';
    }
  };



  // 回転方向検出関数
  p.detectRotationDirection = function (directionSequence) {
    if (directionSequence.length < 2) {
      return 'none';
    }

    // 最後の2つの方向から回転方向を推定
    let lastTwo = directionSequence.slice(-2);

    // 右回りのパターン: right->down, down->left, left->up, up->right
    let clockwiseTransitions = [
      ['right', 'down'], ['down', 'left'], ['left', 'up'], ['up', 'right']
    ];

    // 左回りのパターン: right->up, up->left, left->down, down->right
    let counterclockwiseTransitions = [
      ['right', 'up'], ['up', 'left'], ['left', 'down'], ['down', 'right']
    ];

    // 最後の遷移がどちらのパターンにマッチするかチェック
    for (let transition of clockwiseTransitions) {
      if (lastTwo[0] === transition[0] && lastTwo[1] === transition[1]) {
        return 'clockwise';
      }
    }

    for (let transition of counterclockwiseTransitions) {
      if (lastTwo[0] === transition[0] && lastTwo[1] === transition[1]) {
        return 'counterclockwise';
      }
    }

    return 'none';
  };

  // flag 1
  {
    p.drawFingerCircle = function (i, fingerNum) {
      p.ellipse(
        (finPosX[i][0] + finPosX[i][fingerNum]) / 2,
        (finPosY[i][0] + finPosY[i][fingerNum]) / 2,
        p.dist(
          finPosX[i][0],
          finPosY[i][0],
          finPosX[i][fingerNum],
          finPosY[i][fingerNum],
        ),
      );
    };

    p.drawFingersCircles = function () {
      for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
        // index finger
        p.fill(30, 30, 130);
        p.drawFingerCircle(i, 1);
        // middle finger
        p.fill(100, 50, 50);
        p.drawFingerCircle(i, 2);
        // ring finger
        p.fill(50, 100, 50);
        p.drawFingerCircle(i, 3);
        // pinky finger
        p.fill(30, 30, 80);
        p.drawFingerCircle(i, 4);
      }
    };

    p.detectFingerTouched = function () {
      if (
        p.dist(finPosX[0][0], finPosY[0][0], finPosX[0][1], finPosY[0][1]) <
        circleMin
      ) {
        flag = 2;
      }
    };
  }

  // flag 2
  {
    p.jabara = function () {
      if (finPosX[0][1]) {
        if (finPosX[1][1]) {
          let distance = p.dist(
            finPosX[0][1],
            finPosY[0][1],
            finPosX[1][1],
            finPosY[1][1],
          )
          let maxDistance = p.width * 0.8; // 最大距離を画面幅の80%に制限
          closeLevel = p.int(
            p.map(
              distance,
              30,
              maxDistance,
              19,
              1,
            ),
          );
          if (distance >= maxDistance) {
            closeLevel = 1;
          } else if (distance <= 30) {
            closeLevel = 19;
          }

          // 急激な変化を防ぐ：直前のcloseLevelが19でない場合、1への急激な変化を制限
          if (prevCloseLevel <= 3 && closeLevel >= 16) {
            closeLevel = prevCloseLevel;
          }

          // 現在のcloseLevelを保存
          prevCloseLevel = closeLevel;
        } else {
          closeLevel = p.int(p.map(finPosX[0][1], 0, p.width, 10, 32));
        }
      } else {
        closeLevel = 19;
      }

      // 他のケースでもprevCloseLevelを更新
      if (prevCloseLevel === undefined) {
        prevCloseLevel = closeLevel;
      }
      if (jabaraImage[closeLevel]) {
        p.image(
          jabaraImage[closeLevel],
          p.width / 2,
          p.height / 2,
          p.width,
          p.height,
        );
      } else {
        p.image(jabaraImage[0], p.width / 2, p.height / 2, p.width, p.height);
        console.log("not found f2's", closeLevel);
      }
    };

    p.checkKeepingClosed = function () {
      if (closeLevel >= 19) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            flag = 3;
            timeoutId = null; // reset timer
          }, waitMilSec);
        }
      } else {
        if (timeoutId !== null) {
          // if not 2, reset timer
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }

  // drawSimple用の変数（グローバルスコープに移動）
  let drawSimpleState = {
    imageIndex: 0,
    completedCircles: 0,
    totalCircles: 6
  };

  // flag 3
  {

    p.drawSimple = function () {
      // 方向が変わった時にインクリメント/デクリメント処理
      if (handTrajectory.currentDirection !== 'none' &&
        handTrajectory.rotationDirection !== 'none' &&
        handTrajectory.currentDirection !== handTrajectory.lastProcessedDirection) {

        // 回転方向に応じてインクリメント/デクリメント
        if (handTrajectory.rotationDirection === 'clockwise') {
          drawSimpleState.imageIndex++;
          console.log('右回り: インクリメント, 画像インデックス:', drawSimpleState.imageIndex);
        } else if (handTrajectory.rotationDirection === 'counterclockwise') {
          drawSimpleState.imageIndex--;
          console.log('左回り: デクリメント, 画像インデックス:', drawSimpleState.imageIndex);
        }

        // 画像インデックスの範囲チェック
        if (drawSimpleState.imageIndex >= drawSimpleImage.length) {
          drawSimpleState.completedCircles++;
          drawSimpleState.imageIndex = 0;
          console.log(`一周完了: ${drawSimpleState.completedCircles}/${drawSimpleState.totalCircles}`);
        } else if (drawSimpleState.imageIndex < 0) {
          drawSimpleState.completedCircles++;
          drawSimpleState.imageIndex = drawSimpleImage.length - 1;
          console.log(`一周完了: ${drawSimpleState.completedCircles}/${drawSimpleState.totalCircles}`);
        }

        // 6周完了したらリセット
        if (drawSimpleState.completedCircles >= drawSimpleState.totalCircles) {
          drawSimpleState.completedCircles = 0;
          drawSimpleState.imageIndex = 0;
          console.log('6周完了、リセット');
        }

        // 処理した方向を記録
        handTrajectory.lastProcessedDirection = handTrajectory.currentDirection;
      }

      // 画像インデックスが範囲内かチェック
      let imageIndex = drawSimpleState.imageIndex;
      if (imageIndex >= drawSimpleImage.length) {
        imageIndex = drawSimpleImage.length - 1;
      }

      if (drawSimpleImage[imageIndex]) {
        p.image(
          drawSimpleImage[imageIndex],
          p.width / 2,
          p.height / 2,
          p.width,
          p.height,
        );
        console.log('使用画像インデックス:', imageIndex, '完了周数:', drawSimpleState.completedCircles);
      } else {
        p.image(drawSimpleImage[0], p.width / 2, p.height / 2, p.width, p.height);
        console.log("画像が見つかりません:", imageIndex);
      }
    };

    p.checkKeepingDrawSimple = function () {
      if (drawSimpleLevel >= 19) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            flag = 1;
            timeoutId = null; // reset timer
          }, waitMilSec);
        }
      } else {
        if (timeoutId !== null) {
          // if not 2, reset timer
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }


};

let myp5 = new p5(sketch);
