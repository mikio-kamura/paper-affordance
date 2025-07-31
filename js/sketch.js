//------- Condortable p5 world :))))) -------//

let canvas;

let sketch = function (p) {
  let handInfo = {};
  let finPosX = [];
  let finPosY = [];
  let thumbRootX = [];
  let thumbRootY = [];

  let scene = 5;
  let circleMin = 10;
  let scene_ = 0;

  let jabaraImage = [];
  let closeLevel;
  let prevCloseLevel = 19; // 直前のcloseLevelを保存
  let waitMilSec = 800;

  let drawSimpleImage = [];

  let threeWindowImage = [];
  let threeWindowFlipImage = [];
  let holdThreeWindowImage = [];

  let boxImage = [];
  let prevBoxState = {
    imageIndex: 0,
  };

  let timeoutId;

  // scene5用の状態管理オブジェクトを追加
  let threeWindowState = {
    imageIndex: 0,
    isFingersClose: false,
    lastY: 0,
    lastActionTime: 0,
    cooldown: 200 // 連続操作防止のための待機時間(ms)
  };

  let threeWindowFlipState = {
    imageIndex: 0,
    prevDist: -1, // 1フレーム前の指の距離を保存（-1で初期化）
    lastActionTime: 0,
    cooldown: 150 // チャタリング防止用の待機時間(ms)
  };

  let holdThreeWindowState = {
    imageIndex: 0,
    prevDist: -1, // 1フレーム前の指の距離を保存（-1で初期化）
    lastActionTime: 0,
    cooldown: 150 // チャタリング防止用の待機時間(ms)
  };

  // 手の軌道追跡用の変数
  let handTrajectory = {
    prevX: 0,
    prevY: 0,
    currentDirection: 'none', // 'right', 'down', 'left', 'up'
    directionSequence: [], // 方向の履歴を保存
    rotationDirection: 'none', // 'clockwise', 'counterclockwise'
    lastProcessedDirection: 'none', // 最後に処理した方向
    totalMovement: 0, // 累積移動量
    lastIncrementTime: 0 // 最後にインクリメントした時間
  };

  // scene 9用の手首回転追跡変数
  let wristRotation = {
    prevWristX: 0,
    prevWristY: 0,
    wristDirection: 'none', // 'clockwise', 'counterclockwise'
    wristRotationSequence: [], // 手首回転の履歴
    totalWristMovement: 0, // 手首の累積移動量
    wristRotationThreshold: 40 // 手首回転検出の閾値
  };

  // scene 9用の状態管理
  let wristTwistState = {
    imageIndex: 0,
    isGrasping: false // 握り状態の検出
  };

  p.setup = function () {
    // cannot use p.preload so load here using callback...
    // load hand images
    // scene 2
    {
      p.loadImage("videos/cropped/jabara/01.png", function (loadedImage) {
        jabaraImage[0] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/02.png", function (loadedImage) {
        jabaraImage[1] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/03.png", function (loadedImage) {
        jabaraImage[2] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/04.png", function (loadedImage) {
        jabaraImage[3] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/05.png", function (loadedImage) {
        jabaraImage[4] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/06.png", function (loadedImage) {
        jabaraImage[5] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/07.png", function (loadedImage) {
        jabaraImage[6] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/08.png", function (loadedImage) {
        jabaraImage[7] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/09.png", function (loadedImage) {
        jabaraImage[8] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/10.png", function (loadedImage) {
        jabaraImage[9] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/11.png", function (loadedImage) {
        jabaraImage[10] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/12.png", function (loadedImage) {
        jabaraImage[11] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/13.png", function (loadedImage) {
        jabaraImage[12] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/14.png", function (loadedImage) {
        jabaraImage[13] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/15.png", function (loadedImage) {
        jabaraImage[14] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/16.png", function (loadedImage) {
        jabaraImage[15] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/17.png", function (loadedImage) {
        jabaraImage[16] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/18.png", function (loadedImage) {
        jabaraImage[17] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/19.png", function (loadedImage) {
        jabaraImage[18] = loadedImage;
      });
      p.loadImage("videos/cropped/jabara/20.png", function (loadedImage) {
        jabaraImage[19] = loadedImage;
      });
    }
    // scene 3
    {
      p.loadImage("videos/cropped/draw-simple/01.png", function (loadedImage) {
        drawSimpleImage[0] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/02.png", function (loadedImage) {
        drawSimpleImage[1] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/03.png", function (loadedImage) {
        drawSimpleImage[2] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/04.png", function (loadedImage) {
        drawSimpleImage[3] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/05.png", function (loadedImage) {
        drawSimpleImage[4] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/06.png", function (loadedImage) {
        drawSimpleImage[5] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/07.png", function (loadedImage) {
        drawSimpleImage[6] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/08.png", function (loadedImage) {
        drawSimpleImage[7] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/09.png", function (loadedImage) {
        drawSimpleImage[8] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/10.png", function (loadedImage) {
        drawSimpleImage[9] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/11.png", function (loadedImage) {
        drawSimpleImage[10] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/12.png", function (loadedImage) {
        drawSimpleImage[11] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/13.png", function (loadedImage) {
        drawSimpleImage[12] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/14.png", function (loadedImage) {
        drawSimpleImage[13] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/15.png", function (loadedImage) {
        drawSimpleImage[14] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/16.png", function (loadedImage) {
        drawSimpleImage[15] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/17.png", function (loadedImage) {
        drawSimpleImage[16] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/18.png", function (loadedImage) {
        drawSimpleImage[17] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/19.png", function (loadedImage) {
        drawSimpleImage[18] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/20.png", function (loadedImage) {
        drawSimpleImage[19] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/21.png", function (loadedImage) {
        drawSimpleImage[20] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/22.png", function (loadedImage) {
        drawSimpleImage[21] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/23.png", function (loadedImage) {
        drawSimpleImage[22] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/24.png", function (loadedImage) {
        drawSimpleImage[23] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/25.png", function (loadedImage) {
        drawSimpleImage[24] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/26.png", function (loadedImage) {
        drawSimpleImage[25] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/27.png", function (loadedImage) {
        drawSimpleImage[26] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/28.png", function (loadedImage) {
        drawSimpleImage[27] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/29.png", function (loadedImage) {
        drawSimpleImage[28] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/30.png", function (loadedImage) {
        drawSimpleImage[29] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/31.png", function (loadedImage) {
        drawSimpleImage[30] = loadedImage;
      });
      p.loadImage("videos/cropped/draw-simple/32.png", function (loadedImage) {
        drawSimpleImage[31] = loadedImage;
      });
    }
    // scene 4
    {
      p.loadImage("videos/cropped/box/01.png", function (loadedImage) {
        boxImage[0] = loadedImage;
      });
      p.loadImage("videos/cropped/box/02.png", function (loadedImage) {
        boxImage[1] = loadedImage;
      });
      p.loadImage("videos/cropped/box/03.png", function (loadedImage) {
        boxImage[2] = loadedImage;
      });
      p.loadImage("videos/cropped/box/04.png", function (loadedImage) {
        boxImage[3] = loadedImage;
      });
      p.loadImage("videos/cropped/box/05.png", function (loadedImage) {
        boxImage[4] = loadedImage;
      });
      p.loadImage("videos/cropped/box/06.png", function (loadedImage) {
        boxImage[5] = loadedImage;
      });
      p.loadImage("videos/cropped/box/07.png", function (loadedImage) {
        boxImage[6] = loadedImage;
      });
      p.loadImage("videos/cropped/box/08.png", function (loadedImage) {
        boxImage[7] = loadedImage;
      });
      p.loadImage("videos/cropped/box/09.png", function (loadedImage) {
        boxImage[8] = loadedImage;
      });
      p.loadImage("videos/cropped/box/10.png", function (loadedImage) {
        boxImage[9] = loadedImage;
      });
      p.loadImage("videos/cropped/box/11.png", function (loadedImage) {
        boxImage[10] = loadedImage;
      });
      p.loadImage("videos/cropped/box/12.png", function (loadedImage) {
        boxImage[11] = loadedImage;
      });
      p.loadImage("videos/cropped/box/13.png", function (loadedImage) {
        boxImage[12] = loadedImage;
      });
      p.loadImage("videos/cropped/box/14.png", function (loadedImage) {
        boxImage[13] = loadedImage;
      });
      p.loadImage("videos/cropped/box/15.png", function (loadedImage) {
        boxImage[14] = loadedImage;
      });
      p.loadImage("videos/cropped/box/16.png", function (loadedImage) {
        boxImage[15] = loadedImage;
      });
      p.loadImage("videos/cropped/box/17.png", function (loadedImage) {
        boxImage[16] = loadedImage;
      });
      p.loadImage("videos/cropped/box/18.png", function (loadedImage) {
        boxImage[17] = loadedImage;
      });
      p.loadImage("videos/cropped/box/19.png", function (loadedImage) {
        boxImage[18] = loadedImage;
      });
      p.loadImage("videos/cropped/box/20.png", function (loadedImage) {
        boxImage[19] = loadedImage;
      });
      p.loadImage("videos/cropped/box/21.png", function (loadedImage) {
        boxImage[20] = loadedImage;
      });
      p.loadImage("videos/cropped/box/22.png", function (loadedImage) {
        boxImage[21] = loadedImage;
      });
      p.loadImage("videos/cropped/box/23.png", function (loadedImage) {
        boxImage[22] = loadedImage;
      });
      p.loadImage("videos/cropped/box/24.png", function (loadedImage) {
        boxImage[23] = loadedImage;
      });
      p.loadImage("videos/cropped/box/25.png", function (loadedImage) {
        boxImage[24] = loadedImage;
      });
      p.loadImage("videos/cropped/box/26.png", function (loadedImage) {
        boxImage[25] = loadedImage;
      });
      p.loadImage("videos/cropped/box/27.png", function (loadedImage) {
        boxImage[26] = loadedImage;
      });
      p.loadImage("videos/cropped/box/28.png", function (loadedImage) {
        boxImage[27] = loadedImage;
      });
      p.loadImage("videos/cropped/box/29.png", function (loadedImage) {
        boxImage[28] = loadedImage;
      });
      p.loadImage("videos/cropped/box/30.png", function (loadedImage) {
        boxImage[29] = loadedImage;
      });
      p.loadImage("videos/cropped/box/31.png", function (loadedImage) {
        boxImage[30] = loadedImage;
      });
      p.loadImage("videos/cropped/box/32.png", function (loadedImage) {
        boxImage[31] = loadedImage;
      });
      p.loadImage("videos/cropped/box/33.png", function (loadedImage) {
        boxImage[32] = loadedImage;
      });
      p.loadImage("videos/cropped/box/34.png", function (loadedImage) {
        boxImage[33] = loadedImage;
      });
    }

    // scene 5
    {
      p.loadImage("videos/cropped/three-windows/01.png", function (loadedImage) {
        threeWindowImage[0] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/02.png", function (loadedImage) {
        threeWindowImage[1] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/03.png", function (loadedImage) {
        threeWindowImage[2] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/04.png", function (loadedImage) {
        threeWindowImage[3] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/05.png", function (loadedImage) {
        threeWindowImage[4] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/06.png", function (loadedImage) {
        threeWindowImage[5] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/07.png", function (loadedImage) {
        threeWindowImage[6] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/08.png", function (loadedImage) {
        threeWindowImage[7] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/09.png", function (loadedImage) {
        threeWindowImage[8] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/10.png", function (loadedImage) {
        threeWindowImage[9] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/11.png", function (loadedImage) {
        threeWindowImage[10] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/12.png", function (loadedImage) {
        threeWindowImage[11] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/13.png", function (loadedImage) {
        threeWindowImage[12] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/14.png", function (loadedImage) {
        threeWindowImage[13] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/15.png", function (loadedImage) {
        threeWindowImage[14] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/16.png", function (loadedImage) {
        threeWindowImage[15] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/17.png", function (loadedImage) {
        threeWindowImage[16] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/18.png", function (loadedImage) {
        threeWindowImage[17] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/19.png", function (loadedImage) {
        threeWindowImage[18] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/20.png", function (loadedImage) {
        threeWindowImage[19] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/21.png", function (loadedImage) {
        threeWindowImage[20] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/22.png", function (loadedImage) {
        threeWindowImage[21] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/23.png", function (loadedImage) {
        threeWindowImage[22] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/24.png", function (loadedImage) {
        threeWindowImage[23] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/25.png", function (loadedImage) {
        threeWindowImage[24] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/26.png", function (loadedImage) {
        threeWindowImage[25] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/27.png", function (loadedImage) {
        threeWindowImage[26] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/28.png", function (loadedImage) {
        threeWindowImage[27] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/29.png", function (loadedImage) {
        threeWindowImage[28] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/30.png", function (loadedImage) {
        threeWindowImage[29] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/31.png", function (loadedImage) {
        threeWindowImage[30] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/32.png", function (loadedImage) {
        threeWindowImage[31] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/33.png", function (loadedImage) {
        threeWindowImage[32] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/34.png", function (loadedImage) {
        threeWindowImage[33] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/35.png", function (loadedImage) {
        threeWindowImage[34] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/36.png", function (loadedImage) {
        threeWindowImage[35] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/37.png", function (loadedImage) {
        threeWindowImage[36] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/38.png", function (loadedImage) {
        threeWindowImage[37] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/39.png", function (loadedImage) {
        threeWindowImage[38] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/40.png", function (loadedImage) {
        threeWindowImage[39] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/41.png", function (loadedImage) {
        threeWindowImage[40] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/42.png", function (loadedImage) {
        threeWindowImage[41] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/43.png", function (loadedImage) {
        threeWindowImage[42] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/44.png", function (loadedImage) {
        threeWindowImage[43] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/45.png", function (loadedImage) {
        threeWindowImage[44] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/46.png", function (loadedImage) {
        threeWindowImage[45] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/47.png", function (loadedImage) {
        threeWindowImage[46] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/48.png", function (loadedImage) {
        threeWindowImage[47] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/49.png", function (loadedImage) {
        threeWindowImage[48] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/50.png", function (loadedImage) {
        threeWindowImage[49] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/51.png", function (loadedImage) {
        threeWindowImage[50] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/52.png", function (loadedImage) {
        threeWindowImage[51] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/53.png", function (loadedImage) {
        threeWindowImage[52] = loadedImage;
      });
    }

    // scene 6
    {
      p.loadImage("videos/cropped/three-windows/54.png", function (loadedImage) {
        threeWindowFlipImage[0] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/55.png", function (loadedImage) {
        threeWindowFlipImage[1] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/56.png", function (loadedImage) {
        threeWindowFlipImage[2] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/57.png", function (loadedImage) {
        threeWindowFlipImage[3] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/58.png", function (loadedImage) {
        threeWindowFlipImage[4] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/59.png", function (loadedImage) {
        threeWindowFlipImage[5] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/60.png", function (loadedImage) {
        threeWindowFlipImage[6] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/61.png", function (loadedImage) {
        threeWindowFlipImage[7] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/62.png", function (loadedImage) {
        threeWindowFlipImage[8] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/63.png", function (loadedImage) {
        threeWindowFlipImage[9] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/64.png", function (loadedImage) {
        threeWindowFlipImage[10] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/65.png", function (loadedImage) {
        threeWindowFlipImage[11] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/66.png", function (loadedImage) {
        threeWindowFlipImage[12] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/67.png", function (loadedImage) {
        threeWindowFlipImage[13] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/68.png", function (loadedImage) {
        threeWindowFlipImage[14] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/69.png", function (loadedImage) {
        threeWindowFlipImage[15] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/70.png", function (loadedImage) {
        threeWindowFlipImage[16] = loadedImage;
      });
    }

    // scene 7
    {
      p.loadImage("videos/cropped/three-windows/71.png", function (loadedImage) {
        holdThreeWindowImage[0] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/72.png", function (loadedImage) {
        holdThreeWindowImage[1] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/73.png", function (loadedImage) {
        holdThreeWindowImage[2] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/74.png", function (loadedImage) {
        holdThreeWindowImage[3] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/75.png", function (loadedImage) {
        holdThreeWindowImage[4] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/76.png", function (loadedImage) {
        holdThreeWindowImage[5] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/77.png", function (loadedImage) {
        holdThreeWindowImage[6] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/78.png", function (loadedImage) {
        holdThreeWindowImage[7] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/79.png", function (loadedImage) {
        holdThreeWindowImage[8] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/80.png", function (loadedImage) {
        holdThreeWindowImage[9] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/81.png", function (loadedImage) {
        holdThreeWindowImage[10] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/82.png", function (loadedImage) {
        holdThreeWindowImage[11] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/83.png", function (loadedImage) {
        holdThreeWindowImage[12] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/84.png", function (loadedImage) {
        holdThreeWindowImage[13] = loadedImage;
      });
      p.loadImage("videos/cropped/three-windows/85.png", function (loadedImage) {
        holdThreeWindowImage[14] = loadedImage;
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

        // p.calcFingerPos();
        handInfo = p.calcFingerPos();
        p.trackHandTrajectory(); // 手の軌道追跡を呼び出す
        p.trackWristRotation(); // 手首の回転追跡を呼び出す
        p.interaction();

        // デバッグ情報を表示
        // p.displayDebugInfo();
      }
    }
  };

  // デバッグ情報表示関数
  p.displayDebugInfo = function () {
    p.push();
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(1);
    p.textSize(16);

    let debugText = [
      `方向: ${handTrajectory.currentDirection}`,
      `回転方向: ${handTrajectory.rotationDirection}`,
      `移動量: ${Math.round(handTrajectory.totalMovement)}`,
      `方向履歴: [${handTrajectory.directionSequence.join(', ')}]`,
      `画像インデックス: ${drawSimpleState.imageIndex}`,
      `完了周数: ${drawSimpleState.completedCircles}/${drawSimpleState.totalCircles}`
    ];

    // scene 9のデバッグ情報を追加
    if (scene === 9) {
      debugText = [
        `手首方向: ${wristRotation.wristDirection}`,
        `手首移動量: ${Math.round(wristRotation.totalWristMovement)}`,
        `手首回転履歴: [${wristRotation.wristRotationSequence.join(', ')}]`,
        `握り状態: ${wristTwistState.isGrasping ? '握り' : '開き'}`,
        `画像インデックス: ${wristTwistState.imageIndex}`,
        `フラグ: ${scene}`
      ];
    }

    for (let i = 0; i < debugText.length; i++) {
      p.text(debugText[i], 10, 30 + i * 20);
    }

    // 手の位置を可視化
    if (finPosX[0] && finPosX[0][1] !== undefined) {
      p.fill(255, 0, 0);
      p.noStroke();
      p.ellipse(finPosX[0][1], finPosY[0][1], 10, 10);

      // scene 9の場合、手首の位置も可視化
      if (scene === 9) {
        let wristX = p.width - detections.multiHandLandmarks[0][0].x * p.width;
        let wristY = detections.multiHandLandmarks[0][0].y * p.height;
        p.fill(0, 255, 0);
        p.ellipse(wristX, wristY, 15, 15);
      }
    }

    p.pop();
  };

  p.calcFingerPos = function () {
    if (!detections || !detections.multiHandLandmarks || detections.multiHandLandmarks.length === 0) {
      return;
    }
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
    // 編集したところ
    return {
      finPosX: finPosX,
      finPosY: finPosY,
      thumbRootX: thumbRootX,
      thumbRootY: thumbRootY,
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

      // 移動量を計算
      let dx = currentX - handTrajectory.prevX;
      let dy = currentY - handTrajectory.prevY;
      let movement = Math.sqrt(dx * dx + dy * dy);

      // 方向の変化を検出
      let newDirection = p.detectDirection(currentX, currentY, handTrajectory.prevX, handTrajectory.prevY);

      if (newDirection !== handTrajectory.currentDirection && newDirection !== 'none') {
        handTrajectory.currentDirection = newDirection;
        handTrajectory.totalMovement = 0; // 方向が変わったらリセット

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

      // 累積移動量を更新
      if (newDirection !== 'none') {
        handTrajectory.totalMovement += movement;
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
    let threshold = 25;

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

  // 手首の回転追跡関数
  p.trackWristRotation = function () {
    if (!detections || !detections.multiHandLandmarks || detections.multiHandLandmarks.length === 0) {
      return;
    }
    if (finPosX[0] && finPosX[0][1] !== undefined) {
      // 手首の位置を取得（MediaPipeの手首ランドマーク）
      let wristX = p.width - detections.multiHandLandmarks[0][0].x * p.width;
      let wristY = detections.multiHandLandmarks[0][0].y * p.height;

      // 初回の初期化
      if (wristRotation.prevWristX === 0 && wristRotation.prevWristY === 0) {
        wristRotation.prevWristX = wristX;
        wristRotation.prevWristY = wristY;
        return;
      }

      // 手首の移動量を計算
      let dx = wristX - wristRotation.prevWristX;
      let dy = wristY - wristRotation.prevWristY;
      let movement = Math.sqrt(dx * dx + dy * dy);

      // 手首の方向変化を検出
      let newWristDirection = p.detectWristDirection(wristX, wristY, wristRotation.prevWristX, wristRotation.prevWristY);

      if (newWristDirection !== wristRotation.wristDirection && newWristDirection !== 'none') {
        wristRotation.wristDirection = newWristDirection;

        // 手首回転履歴に追加
        if (wristRotation.wristRotationSequence.length < 4) {
          wristRotation.wristRotationSequence.push(newWristDirection);
        } else {
          wristRotation.wristRotationSequence.shift();
          wristRotation.wristRotationSequence.push(newWristDirection);
        }

        // 手首の回転方向を検出
        wristRotation.wristDirection = p.detectWristRotationDirection(wristRotation.wristRotationSequence);
      }

      // 累積移動量を更新
      if (newWristDirection !== 'none') {
        wristRotation.totalWristMovement += movement;
      }

      wristRotation.prevWristX = wristX;
      wristRotation.prevWristY = wristY;
    }
  };

  // 手首の方向検出関数
  p.detectWristDirection = function (currentX, currentY, prevX, prevY) {
    let dx = currentX - prevX;
    let dy = currentY - prevY;

    // 最小移動量の閾値
    let threshold = 15;

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

  // 手首の回転方向検出関数
  p.detectWristRotationDirection = function (directionSequence) {
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

  // 握り状態の検出関数
  p.detectGrasping = function () {
    if (finPosX[0] && finPosX[0][1] !== undefined) {
      // 親指と人差し指の距離を計算
      let thumbIndexDistance = p.dist(finPosX[0][0], finPosY[0][0], finPosX[0][1], finPosY[0][1]);

      // 握り状態の閾値（小さい値で握り状態と判定）
      let graspThreshold = 30;

      wristTwistState.isGrasping = thumbIndexDistance < graspThreshold;

      return wristTwistState.isGrasping;
    }
    return false;
  };

  // scene 1
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
      if ((finPosX[0] && finPosX[0][1]) &&
        p.dist(finPosX[0][0], finPosY[0][0], finPosX[0][1], finPosY[0][1]) <
        circleMin
      ) {
        scene = 2;
      }
    };
  }

  // scene 2
  {
    p.jabara = function () {
      if (finPosX[0] && finPosX[0][1]) {
        if (finPosX[1] && finPosX[1][1]) {
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
      if (closeLevel >= 18) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 3;
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
  };

  // scene 3
  {

    p.drawSimple = function () {
      // 移動量に基づいてインクリメント/デクリメント処理
      if (handTrajectory.currentDirection !== 'none' &&
        handTrajectory.rotationDirection !== 'none' &&
        handTrajectory.totalMovement > 30) { // 移動量が30を超えたら

        // 回転方向に応じてインクリメント/デクリメント
        if (handTrajectory.rotationDirection === 'clockwise') {
          drawSimpleState.imageIndex++;
          console.log('右回り: インクリメント, 画像インデックス:', drawSimpleState.imageIndex);
        } else if (handTrajectory.rotationDirection === 'counterclockwise') {
          drawSimpleState.imageIndex--;
          console.log('左回り: デクリメント, 画像インデックス:', drawSimpleState.imageIndex);
        }

        // 移動量をリセット
        handTrajectory.totalMovement = 0;
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
      if (drawSimpleState.imageIndex >= drawSimpleImage.length) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 5;
            drawSimpleState.imageIndex = 0;
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

  // scene 4
  {
    let boxState = {
      imageIndex: 0,
    };

    p.Box = function () {
      if (finPosX[0] && finPosX[0][1]) {
        if (finPosX[1] && finPosX[1][1]) {
          let distance = p.dist(
            finPosX[0][1],
            finPosY[0][1],
            finPosX[1][1],
            finPosY[1][1],
          )
          console.log('distance', distance)
          let maxDistance = p.width * 0.8; // 最大距離を画面幅の80%に制限

          // まずscene_の切り替えを判定
          if (scene_ == 0 && prevBoxState.imageIndex == 23 && distance < 30) {
            scene_ = 1;
            console.log('scene_ switched to 1');
          } else if (scene_ == 1 && prevBoxState.imageIndex == 24 && distance < 30) {
            scene_ = 0;
            console.log('scene_ switched to 0');
          }

          // scene_に応じて画像インデックスを計算
          if (scene_ == 0) {
            boxState.imageIndex = p.int(
              p.map(distance, 30, maxDistance, 24, 1,),);
          } else {
            boxState.imageIndex = p.int(p.map(finPosX[0][1], 50, p.width, 24, boxImage.length - 1));
          }

          // 距離による制限
          if (distance >= maxDistance) {
            if (scene_ == 0) {
              boxState.imageIndex = 1;
            } else {
              boxState.imageIndex = boxImage.length - 1;
            }
          }

          // 急激な変化を防ぐ
          if (scene_ == 0 && prevBoxState.imageIndex <= 3 && boxState.imageIndex >= 23) {
            boxState.imageIndex = prevBoxState.imageIndex;
          }

          console.log('scene_ =', scene_, 'distance =', distance, 'boxState.imageIndex =', boxState.imageIndex, 'prevBoxState.imageIndex =', prevBoxState.imageIndex);
          prevBoxState.imageIndex = boxState.imageIndex;
        } else {
          boxState.imageIndex = p.int(p.map(finPosX[0][1], 0, p.width, 0, boxImage.length - 1));
        }
      } else {
        boxState.imageIndex = boxImage.length - 1;
      }

      // 他のケースでもprevBoxState.imageIndexを更新
      if (prevBoxState.imageIndex === undefined) {
        prevBoxState.imageIndex = boxState.imageIndex;
      }
      if (boxImage[boxState.imageIndex]) {
        p.image(
          boxImage[boxState.imageIndex],
          p.width / 2,
          p.height / 2,
          p.width,
          p.height,
        );
      } else {
        p.image(boxImage[0], p.width / 2, p.height / 2, p.width, p.height);
        console.log("not found f4's", boxState.imageIndex);
      }
    };

    p.checkKeepingBox = function () {
      if (boxState.imageIndex >= boxImage.length - 1) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 1;
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


  // scene 5
  {
    /**
     * scene5のメインロジック。
     * 親指、人差し指、中指が近づいている状態で手を下に動かすとコマが進む。
     */
    p.threeWindows = function () {
      if (!detections.multiHandLandmarks || detections.multiHandLandmarks.length === 0) {
        if (threeWindowImage[threeWindowState.imageIndex]) {
          p.image(threeWindowImage[threeWindowState.imageIndex], p.width / 2, p.height / 2, p.width, p.height);
        }
        return;
      }

      // 指の座標を取得 (0:親指, 1:人差し指, 2:中指)
      const thumbX = finPosX[0][0];
      const thumbY = finPosY[0][0];
      const indexX = finPosX[0][1];
      const indexY = finPosY[0][1];
      const middleX = finPosX[0][2];
      const middleY = finPosY[0][2];

      // 3本の指の座標がすべて取得できているか確認
      if (thumbX === undefined || indexX === undefined || middleX === undefined) {
        if (threeWindowImage[threeWindowState.imageIndex]) {
          p.image(threeWindowImage[threeWindowState.imageIndex], p.width / 2, p.height / 2, p.width, p.height);
        }
        return;
      }

      // 指間の距離を計算
      const distThumbIndex = p.dist(thumbX, thumbY, indexX, indexY);
      const distIndexMiddle = p.dist(indexX, indexY, middleX, middleY);
      const closeThreshold = 70; // 指が近いと判定する閾値 (環境に合わせて調整してください)

      // 3本の指が十分に近づいているか判定
      if (distThumbIndex < closeThreshold && distIndexMiddle < closeThreshold) {
        threeWindowState.isFingersClose = true;

        // 手の中心のY座標を計算
        const handCenterY = (thumbY + indexY + middleY) / 3;

        // Y座標の初期化
        if (threeWindowState.lastY === 0) {
          threeWindowState.lastY = handCenterY;
        }

        const moveThreshold = 5; // 下への移動を検出する閾値 (感度調整)
        const currentTime = p.millis();

        // 手が下に移動し、かつクールダウン時間が経過しているかチェック
        if (handCenterY > threeWindowState.lastY + moveThreshold && currentTime > threeWindowState.lastActionTime + threeWindowState.cooldown) {

          // コマを進める
          if (threeWindowState.imageIndex < threeWindowImage.length - 1) {
            threeWindowState.imageIndex++;
            console.log("Scene5: コマを進めました。Index:", threeWindowState.imageIndex);
          }

          // タイムスタンプとY座標を更新
          threeWindowState.lastActionTime = currentTime;
          threeWindowState.lastY = handCenterY;
        } else if (handCenterY < threeWindowState.lastY) {
          // 手が上に移動したらY座標を更新し、再度下への移動を検出しやすくする
          threeWindowState.lastY = handCenterY;
        }

      } else {
        // 指が離れたら状態をリセット
        threeWindowState.isFingersClose = false;
        threeWindowState.lastY = 0;
      }

      // 現在のコマの画像を表示
      let currentIndex = threeWindowState.imageIndex;
      if (threeWindowImage[currentIndex]) {
        p.image(threeWindowImage[currentIndex], p.width / 2, p.height / 2, p.width, p.height);
      } else if (threeWindowImage.length > 0) {
        p.image(threeWindowImage[0], p.width / 2, p.height / 2, p.width, p.height);
      }
    };

    /**
     * scene5の終了条件をチェックする関数。
     * アニメーションが最後まで再生されたら一定時間後にシーンを切り替える。
     */
    p.checkKeepingThreeWindows = function () {
      if (threeWindowState.imageIndex >= threeWindowImage.length - 1) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 6; // 次のシーンへ（例として1）
            threeWindowState.imageIndex = 0; // インデックスをリセット
            timeoutId = null;
          }, waitMilSec);
        }
      } else {
        // 条件を満たしていない場合はタイマーをクリア
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }

  // scene 6
  {
    /**
     * scene6のメインロジック。
     * 人差し指が親指に近づく動きを検出してコマを進める。
     */
    p.pinchAdvance = function () {
      // 手が検出されていない場合は現在の画像を表示して終了
      if (!detections.multiHandLandmarks || detections.multiHandLandmarks.length === 0) {
        if (threeWindowFlipImage[threeWindowFlipState.imageIndex]) {
          p.image(threeWindowFlipImage[threeWindowFlipState.imageIndex], p.width / 2, p.height / 2, p.width, p.height);
        }
        return;
      }

      // 親指(0)と人差し指(1)の座標を取得
      const thumbX = finPosX[0][0];
      const thumbY = finPosY[0][0];
      const indexX = finPosX[0][1];
      const indexY = finPosY[0][1];

      // 座標が有効かチェック
      if (thumbX === undefined || indexX === undefined) {
        if (threeWindowFlipImage[threeWindowFlipState.imageIndex]) {
          p.image(threeWindowFlipImage[threeWindowFlipState.imageIndex], p.width / 2, p.height / 2, p.width, p.height);
        }
        return;
      }

      // 現在の指の距離を計算
      const currentDist = p.dist(thumbX, thumbY, indexX, indexY);

      // prevDistが未設定（-1）の場合、現在の距離で初期化
      if (threeWindowFlipState.prevDist === -1) {
        threeWindowFlipState.prevDist = currentDist;
      }

      const distChangeThreshold = 5; // 反応する距離の変化量の閾値
      const currentTime = p.millis();

      // 条件：(1)指が近づいており (2)その変化が閾値より大きく (3)クールダウンが終了している
      if (currentDist < threeWindowFlipState.prevDist - distChangeThreshold &&
        currentTime > threeWindowFlipState.lastActionTime + threeWindowFlipState.cooldown) {

        // コマを進める
        if (threeWindowFlipState.imageIndex < threeWindowFlipImage.length - 1) {
          threeWindowFlipState.imageIndex++;
          console.log("Scene6: コマを進めました。Index:", threeWindowFlipState.imageIndex);
        }

        // アクション実行時間を更新
        threeWindowFlipState.lastActionTime = currentTime;
      }

      // 次のフレームのために現在の距離を保存
      threeWindowFlipState.prevDist = currentDist;

      // 画像を表示
      let currentIndex = threeWindowFlipState.imageIndex;
      if (threeWindowFlipImage[currentIndex]) {
        p.image(threeWindowFlipImage[currentIndex], p.width / 2, p.height / 2, p.width, p.height);
      } else if (threeWindowFlipImage.length > 0) {
        p.image(threeWindowFlipImage[0], p.width / 2, p.height / 2, p.width, p.height);
      }
    };

    /**
     * scene6の終了条件をチェックする関数
     */
    p.checkKeepingThreeWindowsFlip = function () {
      if (threeWindowFlipState.imageIndex >= threeWindowFlipImage.length - 1) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 7; // 最初のシーンに戻る
            threeWindowFlipState.imageIndex = 0; // 状態をリセット
            threeWindowFlipState.prevDist = -1;
            timeoutId = null;
          }, waitMilSec);
        }
      } else {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }

  // scene 7
  {
    /**
  * 親指と中指が近づいているかを判定する
  */
    p.detectMiddleFingerPinch = function () {
      if (finPosX[0] && finPosX[0][2] !== undefined) {
        // 親指(0)と中指(2)の距離を計算
        const distance = p.dist(finPosX[0][0], finPosY[0][0], finPosX[0][2], finPosY[0][2]);
        const pinchThreshold = 60; // 近いと判定する閾値
        holdThreeWindowState.isFingersClose = (distance < pinchThreshold);
        return holdThreeWindowState.isFingersClose;
      }
      holdThreeWindowState.isFingersClose = false;
      return false;
    };
    p.middleFingerTwist = function () {
      // まず、指が近づいているか状態を更新
      p.detectMiddleFingerPinch();

      // 指が近づいている場合のみ、手首の回転を処理
      if (holdThreeWindowState.isFingersClose) {
        // このロジックはscene9(wristTwist)とほぼ同じ
        if (wristRotation.wristDirection !== 'none' &&
          wristRotation.totalWristMovement > wristRotation.wristRotationThreshold) {

          holdThreeWindowState.imageIndex++;
          console.log('Scene7: コマを進めました。Index:', holdThreeWindowState.imageIndex);
          // 累積した移動量をリセット
          wristRotation.totalWristMovement = 0;
        }
      }

      // 画像インデックスが配列の範囲内に収まるように調整
      if (holdThreeWindowState.imageIndex >= holdThreeWindowImage.length) {
        holdThreeWindowState.imageIndex = holdThreeWindowImage.length - 1;
      } else if (holdThreeWindowState.imageIndex < 0) {
        holdThreeWindowState.imageIndex = 0;
      }

      // 画像の表示
      let currentIndex = holdThreeWindowState.imageIndex;
      if (holdThreeWindowImage[currentIndex]) {
        p.image(holdThreeWindowImage[currentIndex], p.width / 2, p.height / 2, p.width, p.height);
      } else if (holdThreeWindowImage.length > 0) {
        p.image(holdThreeWindowImage[0], p.width / 2, p.height / 2, p.width, p.height);
      }
    };
    /**
     * scene7の終了条件をチェックする関数
     */
    p.checkKeepingHoldThreeWindow = function () {
      if (holdThreeWindowState.imageIndex >= holdThreeWindowImage.length - 1) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 1; // 最初のシーンに戻る
            holdThreeWindowState.imageIndex = 0; // 状態をリセット
            holdThreeWindowState.prevDist = -1;
            timeoutId = null;
          }, waitMilSec);
        }
      } else {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }

  // scene 9
  {
    p.wristTwist = function () {
      // 握り状態を検出
      p.detectGrasping();

      // 握り状態でない場合は何もしない
      if (!wristTwistState.isGrasping) {
        return;
      }

      // 手首の回転動作を検出して画像インデックスを制御
      if (wristRotation.wristDirection !== 'none' &&
        wristRotation.totalWristMovement > wristRotation.wristRotationThreshold) {

        // 回転方向に応じてインクリメント/デクリメント
        if (wristRotation.wristDirection === 'clockwise') {
          wristTwistState.imageIndex++;
          console.log('手首右回り: インクリメント, 画像インデックス:', wristTwistState.imageIndex);
        } else if (wristRotation.wristDirection === 'counterclockwise') {
          wristTwistState.imageIndex--;
          console.log('手首左回り: デクリメント, 画像インデックス:', wristTwistState.imageIndex);
        }

        // 移動量をリセット
        wristRotation.totalWristMovement = 0;
      }

      // 画像インデックスが範囲内かチェック
      let imageIndex = wristTwistState.imageIndex;
      if (imageIndex >= drawSimpleImage.length) {
        imageIndex = drawSimpleImage.length - 1;
      } else if (imageIndex < 0) {
        imageIndex = 0;
      }

      if (drawSimpleImage[imageIndex]) {
        p.image(
          drawSimpleImage[imageIndex],
          p.width / 2,
          p.height / 2,
          p.width,
          p.height,
        );
        console.log('手首ひねり使用画像インデックス:', imageIndex);
      } else {
        p.image(drawSimpleImage[0], p.width / 2, p.height / 2, p.width, p.height);
        console.log("手首ひねり画像が見つかりません:", imageIndex);
      }
    };

    p.checkKeepingWristTwist = function () {
      // 握り状態が解除された場合の処理
      if (!wristTwistState.isGrasping) {
        if (timeoutId === null) {
          timeoutId = setTimeout(() => {
            scene = 1;
            wristTwistState.imageIndex = 0;
            timeoutId = null; // reset timer
          }, waitMilSec);
        }
      } else {
        if (timeoutId !== null) {
          // 握り状態が続いている場合はタイマーをリセット
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }

  p.interaction = function () {
    if (scene == 1) {
      p.drawFingersCircles();
      p.detectFingerTouched();
    } else if (scene == 2) {
      p.jabara();
      p.checkKeepingClosed();
    } else if (scene == 3) {
      p.drawSimple();
      p.checkKeepingDrawSimple();
    } else if (scene == 4) {
      p.Box();
      p.checkKeepingBox();
    } else if (scene == 5) {
      p.threeWindows();
      p.checkKeepingThreeWindows();
    } else if (scene == 6) {
      p.pinchAdvance();
      p.checkKeepingThreeWindowsFlip();
    } else if (scene == 7) {
      p.middleFingerTwist();
      p.checkKeepingHoldThreeWindow();
    } else if (scene == 9) {
      p.wristTwist();
      p.checkKeepingWristTwist();
    }
  };
};

let myp5 = new p5(sketch);
