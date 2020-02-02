export const defaultAppData = {
  title: "FACE LINES",
  infoUrl: "https://artfly.io/binary-hands",
  settings: {
    showVerticalLines: false,
    showHorizontalLines: true,
    fringeFraction: 0.03,
    totalBlocksAlongLongestSide: {
      label: "Total Blocks Along Longest Side",
      type: "range",
      min: 10,
      max: 120,
      value: 48
    },
    pointOffset: {
      label: "Point Offset",
      type: "range",
      min: 0,
      max: 50,
      value: 4.1
    },
    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 50,
      value: 2
    }
  }
};
