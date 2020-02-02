import React from "react";

export const Wiggle = ({
  x = 0,
  y = 0,
  blockSize,
  overFlow = 1,
  wiggleData,
  showControlPoints = false,
  showBlocks = false
}) => {
  const startX = x;
  const startY = y;

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
    const wiggleFraction = Math.max(wiggleData[i], minWiggleFraction);
    const wigglesPerBox = 1 + Math.ceil(wiggleFraction * 5);

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
    <g>
      {showBlocks &&
        wiggleData.map((fraction, index) => {
          const blockX = x + blockSize * index;
          const blockY = y - blockSize / 2;

          return (
            <rect
              stroke="rgba(0,0,0,0.1)"
              fill="transparent"
              key={index}
              x={blockX}
              y={blockY}
              width={blockSize}
              height={blockSize}
            />
          );
        })}

      {showControlPoints &&
        nodePointProps.map((node, index) => {
          return (
            <circle key={index} cx={node.x} cy={node.y} r="2" fill={"green"} />
          );
        })}

      {showControlPoints &&
        controlPointProps.map((node, index) => {
          return (
            <g key={index}>
              <line
                x1={node.x}
                y1={node.y}
                x2={node.targX}
                y2={node.targY}
                stroke="black"
              />
              <circle cx={node.x} cy={node.y} r="2" fill={"red"} />
            </g>
          );
        })}

      <path
        d={fullWigglePath}
        strokeLinejoin={"round"}
        strokeLinecap={"round"}
        strokeWidth={1.5}
        stroke="black"
        fill="transparent"
      />
    </g>
  );
};
