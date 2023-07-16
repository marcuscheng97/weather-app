// config
import { defaultSettings } from "@/config/layouts";

export const getSettings = () => {
  const themeMode = defaultSettings.themeMode;
  const themeDirection = defaultSettings.themeDirection;
  const themeColorPresets = defaultSettings.themeColorPresets;
  const themeLayout = defaultSettings.themeLayout;
  const themeContrast = defaultSettings.themeContrast;
  const themeStretch = defaultSettings.themeStretch;

  return {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
  };
};
