import React from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import "@material/button/dist/mdc.button.css";
import { Button } from "@rmwc/button";
// comps
import SliderControl from "./sliderControl/SliderControl";
import { SwitchControl } from "./switchControl/SwitchControl";

const Controls = ({ appData, onUpdate }) => {
  const { settings } = appData;

  const updateSettings = (key, newValue) => {
    const newSetting = { ...settings[key], value: newValue };
    onUpdate({
      ...appData,
      settings: { ...settings, [key]: newSetting }
    });
  };

  const settingsKeys = Object.keys(settings);

  const onSaveSvgClick = () => {
    console.log("save svg please");
    save_as_svg();
    // var full_svg = get_svg_text();
    // var blob = new Blob([full_svg], { type: "image/svg+xml" });
    // saveAs(blob, "graph.svg");
  };

  return (
    <Container>
      <ControlsUI>
        <div>
          <Button label="Save SVG" raised onClick={onSaveSvgClick} />
        </div>

        {settingsKeys.map(key => {
          const currSetting = settings[key];

          if (currSetting.type === "boolean") {
            return (
              <SwitchControl
                key={key}
                label={currSetting.label}
                value={currSetting.value}
                onChange={value => updateSettings(key, value)}
              />
            );
          } else if (currSetting.type === "range") {
            return (
              <SliderControl
                key={key}
                labelStyle={{ minWidth: 150 }}
                label={currSetting.label}
                displayValue={true}
                min={currSetting.min}
                max={currSetting.max}
                value={currSetting.value}
                onChange={value => updateSettings(key, value)}
              />
            );
          }
        })}
      </ControlsUI>
    </Container>
  );
};

export default Controls;

// STYLES
const Container = styled.div`
  padding-top: 5px;
  background: black;
  color: white;
`;

const ControlsUI = styled.div`
  margin: 15px;
`;

const save_as_svg = () => {
  var full_svg = get_svg_text();
  var blob = new Blob([full_svg], { type: "image/svg+xml" });
  saveAs(blob, "graph.svg");
};

const get_svg_text = () => {
  var svg_data = document.getElementById("svgHolder")
    ? document.getElementById("svgHolder").innerHTML
    : "waiting"; //put id of your svg element here

  svg_data = svg_data.split(">").join(`>
  `);

  return svg_data;
};
