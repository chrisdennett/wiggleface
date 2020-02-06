import React from "react";
import styled from "styled-components";
// comps
import SliderControl from "./sliderControl/SliderControl";

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
  const rangeSettingsKeys = settingsKeys.filter(
    key => settings[key].type === "range"
  );

  return (
    <Container>
      <ControlsUI>
        {rangeSettingsKeys.map(key => {
          const currSetting = settings[key];
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
