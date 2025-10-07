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
  background?: string
) => {
  if (background === undefined) return dark;
  if (light === undefined) light = "#fff";
  if (dark === undefined) dark = "#000";

  let bgRgb = hexToRgb(background);
  let bgLum = rgbToLuminance(bgRgb[0], bgRgb[1], bgRgb[2]);
  let lightRgb = hexToRgb(light);
  let lightLum = rgbToLuminance(lightRgb[0], lightRgb[1], lightRgb[2]);
  let darkRgb = hexToRgb(dark);
  let darkLum = rgbToLuminance(darkRgb[0], darkRgb[1], darkRgb[2]);

  let lightContrast = (bgLum - lightLum) * (bgLum - lightLum)
  let darkContrast = (bgLum - darkLum) * (bgLum - darkLum)

  return lightContrast > darkContrast ? light : dark;
};
