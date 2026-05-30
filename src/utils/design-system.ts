export const SPRINT_DESIGN_SYSTEM = {
  typography: {
    fontFamily: "SF Pro Display, Inter, sans-serif",
    display: { size: "34px", weight: "700", tracking: "-0.5px", lineHeight: "41px" },
    heading1: { size: "24px", weight: "600", tracking: "-0.3px", lineHeight: "30px" },
    heading2: { size: "20px", weight: "600", tracking: "-0.2px", lineHeight: "25px" },
    subheading: { size: "17px", weight: "500", tracking: "-0.1px", lineHeight: "22px" },
    body: { size: "15px", weight: "400", tracking: "0px", lineHeight: "20px" },
    caption: { size: "12px", weight: "500", tracking: "+0.1px", lineHeight: "16px" }
  },
  layout: {
    baseGrid: 8,
    borderRadiusCard: "16px",
    borderRadiusInteractive: "12px",
    touchTargetMin: "44px",
  },
  motion: {
    springSheet: { type: "spring", mass: 1.0, stiffness: 190, damping: 24 },
    springTactile: { type: "spring", mass: 0.7, stiffness: 320, damping: 18 },
    shimmerDuration: 1.2
  }
};

/**
 * Triggers hardware-level haptic feedback sequences.
 * Must be called in response to user interaction.
 */
export const Haptics = {
  heavyImpact: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }
  },
  mediumTap: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }
  },
  lightWarning: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  }
};
