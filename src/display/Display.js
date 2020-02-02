import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wiggle } from "./Wiggle";

const Display = ({ sizeInfo, appData }) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);
  const [blockSize, setBlockSize] = useState(10);
  const [blockData, setBlockData] = useState(null);

  const lineColour = "black";
  const {
    pointOffset,
    lineThickness,
    showVerticalLines,
    showHorizontalLines,
    totalBlocksAlongLongestSide
  } = appData.settings;

  const maxLineOffset = blockSize * pointOffset.value;
  //const totalBlocksAlongLongestSide = 64;

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };
      image.src = "img/holly.jpg";
      // image.src = "img/sample-397x480.png";
    } else {
      const smallCanvas = createSmallCanvas(
        sourceImg,
        totalBlocksAlongLongestSide.value,
        totalBlocksAlongLongestSide.value
      );
      const bData = getBlockData(smallCanvas);

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
  }, [sourceImg, sizeInfo]);

  if (!blockData) return <div>NO DATA</div>;

  const { rows } = blockData;

  return (
    <Container>
      <svg
        style={{ width: "100%", height: "100%" }}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      >
        {showHorizontalLines &&
          rows.map((row, index) => (
            <Wiggle
              key={index}
              x={0}
              y={index * blockSize}
              blockSize={blockSize}
              wiggleData={row}
            />
          ))}
      </svg>
    </Container>
  );
};

export default Display;

// const createWiggleData = (blockData) => {
//   let horizontalPaths = [];

//   const { rows } = blockData;
//   const totalRows = rows.length;
//   let x, y, colIndex, row, rowIndex, pointOffset;

//   // create rows
//   for (rowIndex = 0; rowIndex < totalRows; rowIndex++) {
//     points = "";
//     row = rows[rowIndex];

//     for (colIndex = 0; colIndex < totalCols; colIndex++) {
//       pointOffset = row[colIndex] * maxLineOffset;

//       x = colIndex * blockSize - pointOffset;
//       y = rowIndex * blockSize - pointOffset;

//       points += ` ${x},${y}`;
//     }

//     horizontalPaths.push(points);
//   }

const createPaths = (blockData, blockSize, maxLineOffset) => {
  let points = "0,0";
  let horizontalPaths = [];
  let verticalPaths = [];

  const { rows, cols } = blockData;
  const totalRows = rows.length;
  const totalCols = rows[0].length;

  let x, y, colIndex, row, col, rowIndex, pointOffset;

  // create rows
  for (rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    points = "";
    row = rows[rowIndex];

    for (colIndex = 0; colIndex < totalCols; colIndex++) {
      pointOffset = row[colIndex] * maxLineOffset;

      x = colIndex * blockSize - pointOffset;
      y = rowIndex * blockSize - pointOffset;

      points += ` ${x},${y}`;
    }

    horizontalPaths.push(points);
  }

  // create cols
  for (colIndex = 0; colIndex < totalCols; colIndex++) {
    points = "";
    col = cols[colIndex];

    for (rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      pointOffset = col[rowIndex] * maxLineOffset;
      y = rowIndex * blockSize - pointOffset;
      x = colIndex * blockSize - pointOffset;

      points += ` ${x},${y}`;
    }

    verticalPaths.push(points);
  }

  return { horizontalPaths, verticalPaths };
};

const getBlockData = inputCanvas => {
  const { width: inputW, height: inputH } = inputCanvas;
  const blockData = {
    width: inputW,
    height: inputH,
    rows: [],
    cols: []
  };

  const inputCtx = inputCanvas.getContext("2d");
  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;

  let i, r, g, b, brightness, decimalPercentage, x, y;

  for (y = 0; y < inputH; y++) {
    const row = [];

    for (x = 0; x < inputW; x++) {
      i = (y * inputW + x) * 4;

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;

      decimalPercentage = 1 - brightness / 255;
      row.push(decimalPercentage);
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

const Container = styled.div`
  background: white;
  width: 100%;
  height: 100%;
`;
