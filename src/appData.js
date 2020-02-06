export const defaultAppData = {
  title: "FACE LINES",
  infoUrl: "https://artfly.io/binary-hands",
  settings: {
    fringeFraction: 0.03,
    totalBlocksAlongLongestSide: {
      label: "Total Blocks Along Longest Side",
      type: "range",
      min: 10,
      max: 120,
      value: 42
    },
    overFlow: {
      label: "Wiggle Overlap",
      type: "range",
      min: 1,
      max: 2.5,
      value: 1.35
    },
    blackYOffset: {
      label: "Black Y Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 2
    },
    blackXOffset: {
      label: "Black X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 2
    },
    magentaYOffset: {
      label: "Magenta Y Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 4
    },
    magentaXOffset: {
      label: "Magenta X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 4
    },
    yellowYOffset: {
      label: "Yellow Y Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 0
    },
    yellowXOffset: {
      label: "Yellow X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 0
    },
    cyanYOffset: {
      label: "Cyan Y Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 6
    },
    cyanXOffset: {
      label: "Cyan X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 6
    },
    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      value: 1.5
    }
  }
};
