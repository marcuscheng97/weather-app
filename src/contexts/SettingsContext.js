import PropTypes from "prop-types";
import { createContext } from "react";
// utils
import getColorPresets, {
  colorPresets,
  defaultPreset,
} from "../utils/getColorPresets";
// config
import { defaultSettings } from "../config/layouts";
import  notistackOptions from "../config/notistack";

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  notistackOptions,
  setColor: defaultPreset,
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node,
  defaultSettings: PropTypes.object,
};

function SettingsProvider({ children, defaultSettings }) {
  return (
    <SettingsContext.Provider    
      value={{
        ...defaultSettings,
        notistackOptions,
        setColor: getColorPresets(defaultSettings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
