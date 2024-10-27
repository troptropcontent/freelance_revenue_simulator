import { ColorValueHex } from "src/components/tokens";

const brightenColor = (hex: ColorValueHex, percent = 50): ColorValueHex => {
  // Remove the hash at the start if it's there
  const code = hex.replace(/^#/, "");

  // Parse the red, green, and blue values
  let r = parseInt(code.substring(0, 2), 16);
  let g = parseInt(code.substring(2, 4), 16);
  let b = parseInt(code.substring(4, 6), 16);

  // Increase each color component by the given percent
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to HEX and return
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export { brightenColor };
