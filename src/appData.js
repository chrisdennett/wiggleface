export const defaultAppData = {
  title: "FACE LINES",
  infoUrl: "https://artfly.io/binary-hands",
  settings: {
    fringeFraction: 0.03,
    showBlackHorizontal: {
      label: "Black Horizontal",
      type: "boolean",
      value: false
    },
    showBlackVertical: {
      label: "Black Vertical",
      type: "boolean",
      value: true
    },
    showCyan: {
      label: "Cyan",
      type: "boolean",
      value: false
    },
    showMagenta: {
      label: "Magenta",
      type: "boolean",
      value: false
    },
    showYellow: {
      label: "Yellow",
      type: "boolean",
      value: false
    },

    totalBlocksAlongLongestSide: {
      label: "Total Blocks Along Longest Side",
      type: "range",
      min: 2,
      max: 120,
      value: 55
    },
    lineThickness: {
      label: "Line Thickness",
      type: "range",
      min: 1,
      max: 10,
      value: 1.3
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
      value: 0
    },
    blackXOffset: {
      label: "Black X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 0
    },
    magentaYOffset: {
      label: "Magenta Y Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 3
    },
    magentaXOffset: {
      label: "Magenta X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 3
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
      value: 6
    },
    cyanYOffset: {
      label: "Cyan Y Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 0
    },
    cyanXOffset: {
      label: "Cyan X Offset",
      type: "range",
      min: 0,
      max: 100,
      value: 0
    }
  }
};
