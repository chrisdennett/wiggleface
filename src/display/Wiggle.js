import React from "react";

export const Wiggle = ({
  x = 0,
  y = 0,
  colour = "#000",
  valueIndex = 0,
  thickness = 1.5,
  blockSize,
  overFlow = 1.8,
  wiggleData
}) => {
  const startX = x;
  const startY = y + blockSize / 2;

  const minWiggleFraction = 0.025;

  let previousHalfWiggleHeight = 0;
  let previousControlXOffset = 0;
  const nodePointProps = [];
  const controlPointProps = [];
  let fullWigglePath = `M ${startX}, ${startY} `;
  nodePointProps.push({ x: startX, y: startY });

  const totalBlocks = wiggleData.length;

  for (let i = 0; i < totalBlocks; i++) {
    // const isLastBlock = i === totalBlocks - 1;
    // enforce a min wiggle
    const wiggleFraction = Math.max(
      wiggleData[i][valueIndex],
      minWiggleFraction
    );

    const minWigglePerBox = 0;
    const wigglesPerBox = minWigglePerBox + Math.ceil(wiggleFraction * 5);

    const wiggleHeight = blockSize * overFlow * wiggleFraction;

    const wiggleWidth = blockSize / wigglesPerBox;
    const halfWiggleWidth = wiggleWidth / 2;
    const halfWiggleHeight = wiggleHeight / 2;
    const blockStartX = startX + i * blockSize;
    const quarterWiggleWidth = halfWiggleWidth / 2;
    const eighthWiggleWidth = quarterWiggleWidth / 2;
    const topControlPointY = startY - halfWiggleHeight;

    const bottomControlPointY = startY + halfWiggleHeight;

    for (let wiggleIndex = 0; wiggleIndex < wigglesPerBox; wiggleIndex++) {
      const wiggleStartX = blockStartX + wiggleWidth * wiggleIndex;

      const midX = wiggleStartX + halfWiggleWidth;
      const endX = wiggleStartX + wiggleWidth;

      let controlPoint1X = wiggleStartX + eighthWiggleWidth;
      const controlPoint2X = midX - eighthWiggleWidth;
      const controlPoint3X = midX + eighthWiggleWidth;
      const controlPoint4X = endX - eighthWiggleWidth;

      let topControlPtY = topControlPointY;

      // adapt first curve based on last one from previous block
      const isFirstWiggle = wiggleIndex === 0;
      if (isFirstWiggle) {
        // reduce the difference between the two control points
        const yDiff = Math.abs(topControlPointY - previousHalfWiggleHeight);
        topControlPtY = startY - (topControlPointY - yDiff);
        controlPoint1X = wiggleStartX + previousControlXOffset / 2;
      }

      fullWigglePath += ` C ${controlPoint1X}, ${topControlPtY} 
                            ${controlPoint2X}, ${topControlPointY} 
                            ${midX}, ${startY}
                          C ${controlPoint3X}, ${bottomControlPointY} 
                            ${controlPoint4X}, ${bottomControlPointY} 
                            ${endX}, ${startY} `;

      // Add control point markers
      nodePointProps.push({ x: midX, y: startY });
      nodePointProps.push({ x: endX, y: startY });
      controlPointProps.push({
        x: controlPoint1X,
        y: topControlPtY,
        targX: wiggleStartX,
        targY: startY
      });
      controlPointProps.push({
        x: controlPoint2X,
        y: topControlPointY,
        targX: midX,
        targY: startY
      });
      controlPointProps.push({
        x: controlPoint3X,
        y: bottomControlPointY,
        targX: midX,
        targY: startY
      });
      controlPointProps.push({
        x: controlPoint4X,
        y: bottomControlPointY,
        targX: endX,
        targY: startY
      });
    }

    previousHalfWiggleHeight = halfWiggleHeight;
    previousControlXOffset = eighthWiggleWidth;
  }

  return (
    <path
      d={fullWigglePath}
      strokeLinejoin={"round"}
      strokeLinecap={"round"}
      strokeWidth={thickness}
      stroke={colour}
      fill="transparent"
    />
  );
};
