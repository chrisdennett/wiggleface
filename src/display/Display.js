import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wiggle } from "./Wiggle";
// import { WebcamCapture } from "../components/WebcamCapture";

const Display = ({ sizeInfo, appData }) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);
  const [blockSize, setBlockSize] = useState(10);
  const [blockData, setBlockData] = useState(null);

  const {
    totalBlocksAlongLongestSide,
    showBlackHorizontal,
    showBlackVertical,
    showCyan,
    showMagenta,
    showYellow,
    lineThickness,
    cyanXOffset,
    cyanYOffset,
    magentaXOffset,
    magentaYOffset,
    yellowXOffset,
    yellowYOffset,
    blackXOffset,
    blackYOffset,
    overFlow,
  } = appData.settings;

  const cyanAsRGB = CMYKtoRGB(255, 0, 0, 0);
  const magentaAsRGB = CMYKtoRGB(0, 255, 0, 0);
  const yellowAsRGB = CMYKtoRGB(0, 0, 255, 0);
  const blackAsRGB = CMYKtoRGB(0, 0, 0, 255);

  const cyan = `rgb(${cyanAsRGB.r}, ${cyanAsRGB.g}, ${cyanAsRGB.b})`;
  const magenta = `rgb(${magentaAsRGB.r}, ${magentaAsRGB.g}, ${magentaAsRGB.b})`;
  const yellow = `rgb(${yellowAsRGB.r}, ${yellowAsRGB.g}, ${yellowAsRGB.b})`;
  const black = `rgb(${blackAsRGB.r}, ${blackAsRGB.g}, ${blackAsRGB.b})`;

  // const onFrameChange = (frameCanvas) => {
  //   const smallCanvas = createSmallCanvas(
  //     frameCanvas,
  //     totalBlocksAlongLongestSide.value,
  //     totalBlocksAlongLongestSide.value
  //   );
  //   // const bData = getBlockData(smallCanvas);
  //   // const bData = getRGBBlockData(smallCanvas);
  //   const bData = getCMYKBlockData(smallCanvas);

  //   const { width, height } = getDimensions(
  //     bData.width,
  //     bData.height,
  //     sizeInfo.width,
  //     sizeInfo.height
  //   );

  //   setBlockData(bData);
  //   setCanvasWidth(width);
  //   setCanvasHeight(height);
  //   setBlockSize(width / bData.width);
  // };

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };
      image.src = "img/douglas-float.png";
      // image.src = "img/jennie-4.jpg";
      // image.src = "img/holly.jpg";
      // image.src = "img/jennie-chris-1.jpg";
      // image.src = "img/holly-dot.jpg";
      // image.src = "img/jennie-eyes.jpg";
      //image.src = "img/jennie-eye.jpg";
      // image.src = "img/sample-397x480.png";
    } else {
      const smallCanvas = createSmallCanvas(
        sourceImg,
        totalBlocksAlongLongestSide.value,
        totalBlocksAlongLongestSide.value
      );
      // const bData = getBlockData(smallCanvas);
      // const bData = getRGBBlockData(smallCanvas);
      const bData = getCMYKBlockData(smallCanvas);

      const { width, height } = getDimensions(
        bData.width,
        bData.height,
        sizeInfo.width,
        sizeInfo.height
      );

      setBlockData(bData);
      setCanvasWidth(width);
      setCanvasHeight(height);
      setBlockSize(width / bData.width);
    }
  }, [sourceImg, sizeInfo, totalBlocksAlongLongestSide.value]);

  if (!blockData) return <div>NO DATA</div>;

  const { rows, cols } = blockData;
  const showRows = true;

  return (
    <Container id="svgHolder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "90%", height: "90%", margin: "2.5%" }}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      >
        {showRows &&
          rows.map((row, index) => (
            <g
              key={index}
              transform={`scale(-1 1) translate(-${canvasWidth} 0)`}
            >
              {showYellow.value && (
                <Wiggle
                  overFlow={overFlow.value}
                  colour={yellow}
                  thickness={lineThickness.value}
                  valueIndex={2}
                  x={yellowXOffset.value}
                  y={yellowYOffset.value + index * blockSize}
                  blockSize={blockSize}
                  wiggleData={row}
                />
              )}

              {showMagenta.value && (
                <Wiggle
                  overFlow={overFlow.value}
                  colour={magenta}
                  thickness={lineThickness.value}
                  valueIndex={1}
                  x={magentaXOffset.value}
                  y={magentaYOffset.value + index * blockSize}
                  blockSize={blockSize}
                  wiggleData={row}
                />
              )}

              {showCyan.value && (
                <Wiggle
                  overFlow={overFlow.value}
                  colour={cyan}
                  thickness={lineThickness.value}
                  valueIndex={0}
                  x={cyanXOffset.value}
                  y={cyanYOffset.value + index * blockSize}
                  blockSize={blockSize}
                  wiggleData={row}
                />
              )}

              {showBlackHorizontal.value && (
                <Wiggle
                  overFlow={overFlow.value}
                  colour={black}
                  thickness={lineThickness.value}
                  valueIndex={3}
                  x={blackXOffset.value}
                  y={blackYOffset.value + index * blockSize}
                  blockSize={blockSize}
                  wiggleData={row}
                />
              )}
            </g>
          ))}

        {showBlackVertical.value &&
          cols.map((col, index) => (
            <g
              key={index}
              transform={`rotate(90)  translate(0 -${canvasWidth})`}
            >
              <Wiggle
                overFlow={overFlow.value}
                colour={black}
                thickness={lineThickness.value}
                valueIndex={3}
                x={blackXOffset.value}
                y={blackYOffset.value + index * blockSize}
                blockSize={blockSize}
                wiggleData={col}
              />
            </g>
          ))}
      </svg>
      {/* <WebcamCapture onFrameChange={onFrameChange} /> */}
    </Container>
  );
};

export default Display;

const getCMYKBlockData = (inputCanvas) => {
  const { width: inputW, height: inputH } = inputCanvas;
  const blockData = {
    width: inputW,
    height: inputH,
    rows: [],
    cols: [],
  };

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let i, r, g, b, cFrac, mFrac, yFrac, kFrac, x, y;

  for (y = 0; y < inputH; y++) {
    const row = [];

    for (x = 0; x < inputW; x++) {
      i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      const { c, m, y: yellow, k } = RGBtoCMYK(r, g, b);

      cFrac = c / 100;
      mFrac = m / 100;
      yFrac = yellow / 100;
      kFrac = k / 100;

      row.push([cFrac, mFrac, yFrac, kFrac]);
    }
    blockData.rows.push(row);
  }

  // loop through the rows and the values in them
  // for each rom push the values each into a different col

  let cellsPerRow = blockData.rows[0].length;
  for (let rowIndex = 0; rowIndex < blockData.rows.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsPerRow; cellIndex++) {
      // add col array if not made yet
      if (!blockData.cols[cellIndex]) blockData.cols[cellIndex] = [];

      // add the row value to the correct col in the correct place
      blockData.cols[cellIndex][rowIndex] = blockData.rows[rowIndex][cellIndex];
    }
  }

  return blockData;
};

// const getRGBBlockData = (inputCanvas) => {
//   const { width: inputW, height: inputH } = inputCanvas;
//   const blockData = {
//     width: inputW,
//     height: inputH,
//     rows: [],
//     cols: [],
//   };

//   const inputCtx = inputCanvas.getContext("2d");
//   let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
//   let pixels = imgData.data;

//   let i, r, g, b, rFrac, gFrac, bFrac, x, y;

//   for (y = 0; y < inputH; y++) {
//     const row = [];

//     for (x = 0; x < inputW; x++) {
//       i = (y * inputW + x) * 4;

//       r = pixels[i];
//       g = pixels[i + 1];
//       b = pixels[i + 2];

//       rFrac = 1 - r / 255;
//       gFrac = 1 - g / 255;
//       bFrac = 1 - b / 255;

//       row.push([rFrac, gFrac, bFrac]);
//     }
//     blockData.rows.push(row);
//   }

//   // loop through the rows and the values in them
//   // for each rom push the values each into a different col

//   let cellsPerRow = blockData.rows[0].length;
//   for (let rowIndex = 0; rowIndex < blockData.rows.length; rowIndex++) {
//     for (let cellIndex = 0; cellIndex < cellsPerRow; cellIndex++) {
//       // add col array if not made yet
//       if (!blockData.cols[cellIndex]) blockData.cols[cellIndex] = [];

//       // add the row value to the correct col in the correct place
//       blockData.cols[cellIndex][rowIndex] = blockData.rows[rowIndex][cellIndex];
//     }
//   }

//   return blockData;
// };

// const getBlockData = (inputCanvas) => {
//   const { width: inputW, height: inputH } = inputCanvas;
//   const blockData = {
//     width: inputW,
//     height: inputH,
//     rows: [],
//     cols: [],
//   };

//   const inputCtx = inputCanvas.getContext("2d");
//   let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
//   let pixels = imgData.data;

//   let i, r, g, b, brightness, decimalPercentage, x, y;

//   for (y = 0; y < inputH; y++) {
//     const row = [];

//     for (x = 0; x < inputW; x++) {
//       i = (y * inputW + x) * 4;

//       r = pixels[i];
//       g = pixels[i + 1];
//       b = pixels[i + 2];

//       brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

//       decimalPercentage = 1 - brightness / 255;
//       row.push([decimalPercentage]);
//     }
//     blockData.rows.push(row);
//   }

//   // loop through the rows and the values in them
//   // for each rom push the values each into a different col

//   let cellsPerRow = blockData.rows[0].length;
//   for (let rowIndex = 0; rowIndex < blockData.rows.length; rowIndex++) {
//     for (let cellIndex = 0; cellIndex < cellsPerRow; cellIndex++) {
//       // add col array if not made yet
//       if (!blockData.cols[cellIndex]) blockData.cols[cellIndex] = [];

//       // add the row value to the correct col in the correct place
//       blockData.cols[cellIndex][rowIndex] = blockData.rows[rowIndex][cellIndex];
//     }
//   }

//   return blockData;
// };

const getDimensions = (sourceW, sourceH, maxWidth, maxHeight) => {
  const widthToHeightRatio = sourceH / sourceW;
  const heightToWidthRatio = sourceW / sourceH;

  // set size based on max width
  let w = maxWidth;
  let h = w * widthToHeightRatio;

  // if that makes the h bigger than max
  if (h > maxHeight) {
    //set size based on max height
    h = maxHeight;
    w = h * heightToWidthRatio;
  }

  // return the output width and height so it can be used to position canvas
  return { width: w, height: h };
};

const createSmallCanvas = (source, maxWidth, maxHeight) => {
  const sourceW = source.width;
  const sourceH = source.height;

  const wToHRatio = sourceH / sourceW;
  const hToWRatio = sourceW / sourceH;

  // allow maxHeight or maxWidth to be null
  if (!maxWidth) maxWidth = source.width;
  if (!maxHeight) maxHeight = source.height;

  let targetW = maxWidth;
  let targetH = targetW * wToHRatio;

  if (sourceH > maxHeight) {
    targetH = maxHeight;
    targetW = targetH * hToWRatio;
  }

  const smallCanvas = document.createElement("canvas");
  const ctx = smallCanvas.getContext("2d");
  smallCanvas.width = targetW;
  smallCanvas.height = targetH;

  ctx.drawImage(source, 0, 0, sourceW, sourceH, 0, 0, targetW, targetH);

  return smallCanvas;
};

export const RGBtoCMYK = (R, G, B) => {
  const r = R / 255;
  const g = G / 255;
  const b = B / 255;

  let k = Math.min(1 - r, 1 - g, 1 - b);
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);

  c = isNaN(c) ? 0 : c;
  m = isNaN(m) ? 0 : m;
  y = isNaN(y) ? 0 : y;

  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);
  k = Math.round(k * 100);

  return { c, m, y, k };
};

export const CMYKtoRGB = (C, M, Y, K) => {
  const c = C / 100;
  const m = M / 100;
  const y = Y / 100;
  const k = K / 100;

  let r = 1 - Math.min(1, c * (1 - k) + k);
  let g = 1 - Math.min(1, m * (1 - k) + k);
  let b = 1 - Math.min(1, y * (1 - k) + k);

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return { r, g, b };
};

// STYLES
const Container = styled.div`
  background: white;
  width: 100%;
  height: 100%;
`;
