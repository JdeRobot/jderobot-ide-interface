const rgbToLuminance = (r: number, g: number, b: number) => {
  /* calculates perceived lightness using the sRGB Luma method 
  Luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255 */
  let luma = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
  return luma;
};

const hexToRgb = (hex: string) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));

export const contrastSelector = (
  light?: string,
  dark?: string,
  background?: string,
) => {
  if (background === undefined) return dark;

  let rgb = hexToRgb(background)

  let isDarkBg = rgbToLuminance(rgb[0], rgb[1], rgb[2]) <= 0.5;

  if (light === undefined) {
    light = "#fff";
  }

  if (dark === undefined) {
    dark = "#000";
  }

  return isDarkBg ? light : dark;
};
